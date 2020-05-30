const travelRoutes = [
  {
    path: '/travelRecord',
    name: 'travelRecord',
    component: () => import('@/views/travel/travel-record'),
    meta: {
      title: '行程记录',
    },
  },
  {
    path: '/travelDetail',
    name: 'travelDetail',
    component: () => import('@/views/travel/travel-detail'),
    meta: {
      title: '出行详情',
    },
  },
]

export default travelRoutes
