import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import getPageTitle from '@/utils/get-page-title';
import { getToken } from '@/utils/auth';

// routes module import
import travelRoutes from './modules/travel'
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
    component: () => import('@/views/travel/index'),
    redirect: '/travel',
  },
  { path: '*', redirect: '/404' },
]

const router = new Router({
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  routes: commonRoutes.concat(travelRoutes, trafficRoutes, nearbyRoutes, userRoutes),
})

// router beforeEach
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 进行浏览器定位
  store.dispatch('position/updateGeoLocation')

  // const hasToken = getToken()
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next({ path: '/login' })
  //   }
  // }
  next()
})

// router afterEach
router.afterEach(() => {
  // console.log('afterEach')
})

export default router
