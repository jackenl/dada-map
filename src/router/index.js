import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import getPageTitle from '@/utils/get-page-title';
import { getToken } from '@/utils/auth';

// routes module import
import sportRoutes from './modules/sport'
import trafficRoutes from './modules/traffic'
import nearbyRoutes from './modules/nearby'
import userRoutes from './modules/user'

Vue.use(Router)

const whiteList = ['/login'] // login whiteList

const commonRoutes = [
  { path: '/login', component: () => import('@/views/login') },
  { path: '/404', component: () => import('@/views/error/404') },
  {
    path: '/',
    component: () => import('@/views/sport/index'),
    redirect: '/traffic',
  },
  { path: '*', redirect: '/404' },
]

const router = new Router({
  // mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  routes: commonRoutes.concat(sportRoutes, trafficRoutes, nearbyRoutes, userRoutes),
})

// router beforeEach
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.hasGetUserInfo
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

// router afterEach
router.afterEach((to, from ) => {
  if (to.path !== '/login') {
    // 进行浏览器定位
    store.dispatch('position/updateGeoLocation')
  }
})

export default router
