import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const routes = [
  { path: '/', component: () => import('~/views/Home.vue'), meta: { requiresAuth: true } },
  { path: '/login', component: () => import('~/components/Auth/Login.vue') },
  { path: '/register', component: () => import('~/components/Auth/Register.vue') },
  { path: '/profile', component: () => import('~/components/Auth/Profile.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login')
  } else {
    next()
  }
})

export default router