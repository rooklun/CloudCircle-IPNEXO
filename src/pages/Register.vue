<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
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
import http from '@/utils/http'
import API_BASE_URL from '@/config/api.js'

const username = ref('')
const email = ref('')
const password = ref('')
const success = ref(false)
const errorMsg = ref('')

const register = async () => {
  success.value = false;
  errorMsg.value = '';
  try {
    const res = await http.post(`${API_BASE_URL}/api/users/register`, {
      username: username.value,
      email: email.value,
      password: password.value
    })
    if (res.success) {
      success.value = true;
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.error || '注册失败，请稍后再试。'
  }
}
</script>

