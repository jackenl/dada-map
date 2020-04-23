const homeRoutes = [
  {
    path: '/sport',
    name: 'sport',
    component: () => import('@/views/sport/index'),
    meta: {
      title: '运动',
    },
  },
  {
    path: '/sportMap',
    name: 'sport-map',
    component: () => import('@/views/sport/sport-map'),
    meta: {
      title: '运动地图',
    },
  },
]

export default homeRoutes
