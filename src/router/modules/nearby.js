const nearbyRoutes = [
  {
    path: '/nearby',
    name: 'nearby',
    component: () => import('@/views/nearby/index'),
    meta: {
      title: '附近',
    },
  },
]

export default nearbyRoutes
