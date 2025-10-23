// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import { isAuthenticated } from '@/auth'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import BooksAdminView from '@/views/BooksAdminView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'

// 定义路由表
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/register', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/addbook', name: 'addbook', component: AddBookView },
  { path: '/admin', name: 'admin', component: BooksAdminView },
  { path: '/GetBookCount', name: 'GetBookCount', component: GetBookCountView },
  { path: '/WeatherCheck', name: 'GetWeather', component: WeatherView },
  { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

// ✅ 使用 import.meta.env.BASE_URL —— 与 vite.config.js 保持同步
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 登录验证
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router