const userRoutes = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index'),
    meta: {
      title: '我的',
    },
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/user/user-info'),
    meta: {
      title: '个人资料',
    },
  },
  {
    path: '/userMap',
    name: 'userMap',
    component: () => import('@/views/user/user-map'),
    meta: {
      title: '点亮城市',
    },
  },
  {
    path: '/travelTrend',
    name: 'travelTrend',
    component: () => import('@/views/user/travel-trend'),
    meta: {
      title: '出行趋势',
    }
  },
  {
    path: '/travelAnalyze',
    name: 'travelAnalyze',
    component: () => import('@/views/travel/travel-analyze'),
    meta: {
      title: '数据分析'
    }
  }
]

export default userRoutes
