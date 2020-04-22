const homeRoutes = [
  {
    path: '/travel',
    name: 'travel',
    component: () => import('@/views/travel/index'),
    meta: {
      title: '出行',
    },
  },
]

export default homeRoutes
