const nearbyRoutes = [
  {
    path: '/nearby',
    name: 'nearby',
    component: () => import('@/views/nearby/index'),
    meta: {
      title: '附近',
    },
  },
  {
    path: '/iframe',
    name: 'iframe',
    component: () => import('@/views/nearby/iframe'),
    meta: {
      title: '窗口',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/nearby/search'),
    meta: {
      title: '搜索',
    },
  },

]

export default nearbyRoutes
