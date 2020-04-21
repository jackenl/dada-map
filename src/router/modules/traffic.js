const trafficRoutes = [
  {
    path: '/traffic',
    name: 'traffic',
    component: () => import('@/views/traffic/index'),
    meta: {
      title: '导航',
    },
    children: [
      {
        path: 'navigation',
        name: 'navigation',
        component: () => import('@/views/traffic/navigation'),
        meta: {
          title: '路线规划'
        }
      }
    ]
  },
]

export default trafficRoutes
