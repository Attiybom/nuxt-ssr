import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    meta: {
      title: '',
      keepAlive: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '',
      keepAlive: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
