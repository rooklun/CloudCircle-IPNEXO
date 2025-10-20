<template>
  <div class="min-h-screen gradient-bg flex items-center justify-center">
    <div class="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 md:p-10 w-full max-w-md">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900">用户注册</h2>

      <form @submit.prevent="register" class="space-y-6">
        <input
          v-model="username"
          type="text"
          placeholder="用户名"
          class="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />

        <input
          v-model="email"
          type="email"
          placeholder="邮箱"
          class="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="密码"
          class="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />

        <p v-if="success" class="text-green-600 text-center mt-1">注册成功！正在跳转...</p>
        <p v-if="errorMsg" class="text-red-600 text-center mt-1">{{ errorMsg }}</p>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          注册
        </button>

        <div class="text-center pt-1">
          <router-link to="/login" class="text-blue-600 hover:text-blue-700 text-sm">
            已有账号？去登录
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/utils/http'
import API_BASE_URL from '@/config/api.ts'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const success = ref(false)

const register = async () => {
  errorMsg.value = ''
  try {
    const { data } = await http.post(`${API_BASE_URL}/api/auth/register`, {
      username: username.value,
      email: email.value,
      password: password.value
    })

    console.log('注册响应:', data)

    if (data.token) {
      authStore.setToken(data.token)
      authStore.setUser(data.user)
      success.value = true
      setTimeout(() => router.push('/user'), 1500)
    }
  } catch (err) {
    console.error('注册错误详情:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data
    })
    errorMsg.value = err.response?.data?.message || '注册失败，请稍后再试。'
  }
}
</script>

