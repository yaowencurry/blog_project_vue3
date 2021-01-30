import { createRouter, createWebHistory } from 'vue-router'
import articalRoutes from './moudle/artical'
import bookRoutes from './moudle/book'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...articalRoutes,
    ...bookRoutes,
    {
      path: '/home',
      name: 'HomeIndex',
      component: () => import(/* webpackChunkName: "login" */'@/views/home/Index.vue'),
    },
    {
      path: '/',
      redirect: '/home'
    },
  ],
})

router.afterEach(() => {
  window, scrollTo(0, 0)
})

export default router;