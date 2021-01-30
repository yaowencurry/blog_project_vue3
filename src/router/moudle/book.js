const articalRoutes = [
  {
    path: '/book',
    name: 'BookIndex',
    component: () => import(/* webpackChunkName: "login" */'@/views/book/Index.vue'),
    meta: {
      title: '电子书阅读'
    }
  },
]

export default articalRoutes