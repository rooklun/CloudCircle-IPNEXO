<template>
  <div class="min-h-screen flex items-center justify-center bg-transparent">
    <div class="bg-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-md">
      
      <h2 class="text-3xl font-bold text-center mb-6 text-white">注册账号</h2>
      
      <form @submit.prevent="register" class="space-y-4">
        
        <input 
          v-model="username" 
          type="text" 
          placeholder="用户名" 
          class="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" 
          required 
        />
        <input 
          v-model="email" 
          type="email" 
          placeholder="邮箱" 
          class="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" 
          required 
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="密码" 
          class="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" 
          required 
        />
        
        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-150"
        >
          注册
        </button>
        
        <p v-if="success" class="text-green-400 text-center mt-3">注册成功！</p>
        <p v-if="errorMsg" class="text-red-400 text-center mt-3">{{ errorMsg }}</p>
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
  errorMsg.value = '';
  try {
    const res = await http.post(`${API_BASE_URL}/api/auth/register`, {
      username: username.value,
      email: email.value,
      password: password.value
    })
    
    console.log("res:", res)
    if (res.token) {
      // 保存登录状态
      authStore.setToken(res.token)
      authStore.setUser(res.user)
      success.value = true
      
      setTimeout(() => {
        router.push('/user')
      }, 1500)
    }
  } catch (error) {
    console.error('注册错误详情:', error.response.data.message)

    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          errorMsg.value = error.response.data.errors?.[0]?.msg || '输入数据有误，请检查'
          break;
        case 401:
          errorMsg.value = error.response.data.message || '用户名或邮箱已被使用'
          break;
        case 500:
          errorMsg.value = '网络错误'
          break;
        default:
          errorMsg.value = '错误的响应码'
      }
    } else {
      errorMsg.value = '网络错误'
    }
  }
}
</script>

