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
    name: 'user-info',
    component: () => import('@/views/user/user-info'),
    meta: {
      title: '个人资料'
    }
  },
  {
    path: '/userMap',
    name: 'user-map',
    component: () => import('@/views/user/user-map'),
    meta: {
      title: '点亮城市'
    }
  }
]

export default userRoutes
