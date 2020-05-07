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
    name: 'sportMap',
    component: () => import('@/views/sport/sport-map'),
    meta: {
      title: '运动地图',
    },
  },
  {
    path: '/sportRecord',
    name: 'sportRecord',
    component: () => import('@/views/sport/sport-record'),
    meta: {
      title: '运动记录',
    }
  }
]

export default homeRoutes
