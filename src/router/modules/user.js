const userRoutes = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index'),
    meta: {
      title: '我的',
    },
    children: [
      {
        path: 'userInfo',
        name: 'user-info',
        component: () => import('@/views/user/user-info'),
        meta: {
          title: '个人资料'
        }
      }
    ]
  },
]

export default userRoutes
