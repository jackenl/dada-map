const trafficRoutes = [
  {
    path: '/traffic',
    name: 'traffic',
    component: () => import('@/views/traffic/index'),
    meta: {
      title: '路线',
    },
  },
]

export default trafficRoutes
