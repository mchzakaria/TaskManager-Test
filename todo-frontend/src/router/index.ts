import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Tasks from '../views/Tasks.vue'


const routes = [
{ path: '/login', name: 'Login', component: Login },
{ path: '/register', name: 'Register', component: Register },
{ path: '/', name: 'Tasks', component: Tasks, meta: { requiresAuth: true } }
]


const router = createRouter({
history: createWebHistory(),
routes
})


router.beforeEach((to, _, next) => {
const auth = useAuthStore()
if (to.meta.requiresAuth && !auth.isAuthenticated) {
next('/login')
} else {
next()
}
})


export default router