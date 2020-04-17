const Travel = () => import('@/views/travel/index')

const homeRoutes = [
  {
    path: '/travel',
    name: 'travel',
    component: Travel,
    meta: {
      title: '出行',
    },
  },
]

export default homeRoutes
