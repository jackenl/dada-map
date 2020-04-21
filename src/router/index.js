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

const whiteList = ['/login'] // no redirect whiteList

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
  routes: commonRoutes.concat(travelRoutes, trafficRoutes, nearbyRoutes, userRoutes),
})

// router beforeEach
router.beforeEach((to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)

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
  // 进行浏览器定位
  store.dispatch('position/updateGeoLocation')
  next()
})

// router afterEach
router.afterEach(() => {
  // console.log('afterEach')
})

export default router
