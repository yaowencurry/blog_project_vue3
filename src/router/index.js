import { createRouter, createWebHistory } from 'vue-router'
import articalRoutes from './moudle/artical'
import bookRoutes from './moudle/book'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...articalRoutes,
    ...bookRoutes,
    {
      path: '/',
      redirect: '/index/home'
    },
    {
      path: '/index',
      component: () => import(/* webpackChunkName: "Index" */'@/views/Index.vue'),
      children: [{
        path: '/index/home',
        name: 'HomeIndex',
        component: () => import(/* webpackChunkName: "HomeIndex" */'@/views/home/Index.vue'),
        meta: {
          title: '首页'
        }
      },{
        path: '/index/apidoc',
        name: 'ApiDoc',
        component: ()=>import(/* webpackChunkName: "ApiDoc" */'@/views/apidoc/Index.vue'),
        meta: {
          title: '框架文档'
        }
      },{
        path: '/index/source',
        name: 'Source',
        component: ()=>import(/* webpackChunkName: "Source" */'@/views/source/Index.vue'),
        meta: {
          title: '资源集合'
        }
      },{
        path: '/index/function',
        name: 'Function',
        component: ()=>import(/* webpackChunkName: "Source" */'@/views/functions/Index.vue'),
        meta: {
          title: '函数工具库'
        }
      }]
    },
    // {
    //   path: '/home',
    //   name: 'HomeIndex',
    //   component: () => import(/* webpackChunkName: "login" */'@/views/home/Index.vue'),
    // },
  ],
})

router.afterEach(() => {
  window, scrollTo(0, 0)
})

export default router;