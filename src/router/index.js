// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/DefaultLayout.vue'
import BlankLayout from '@/components/BlankLayout.vue' 

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/Home.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/pages/Register.vue')
      }
    ]
  },
  {
    path: '/user',
    component: BlankLayout,
    children: [
      {
        path: '',
        name: 'User',
        component: () => import('@/pages/User/User.vue')
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // history 模式
  routes
})

// 导出路由实例
export default router
