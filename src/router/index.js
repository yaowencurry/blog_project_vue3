import { createRouter, createWebHistory } from 'vue-router'
import articalRoutes from './moudle/artical'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...articalRoutes,
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