// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
import Home from '@/pages/Home.vue'
import Register from '@/pages/Register.vue'
import Contact from '@/pages/Contact.vue'
import Login from '@/pages/Login.vue'

// 定义路由规则
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/:pathMatch(.*)*', redirect: '/' } // 防止 404
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // history 模式
  routes
})

// 导出路由实例
export default router
