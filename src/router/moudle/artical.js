const articalRoutes = [
  {
    path: '/artical/detail',
    name: 'ArticalDetail',
    component: () => import(/* webpackChunkName: "login" */'@/components/artical/ArticalDetail.vue'),
    meta: {
      title: '文章详情'
    }
  },
  {
    path: '/artical/edit',
    name: 'EditArtical',
    component: () => import(/* webpackChunkName: "login" */'@/views/edit/Index.vue'),
    meta: {
      title: '编辑文章'
    }
  },
]

export default articalRoutes