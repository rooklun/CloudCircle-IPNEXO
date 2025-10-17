<template>
  <div class="min-h-screen flex items-center justify-center bg-transparent">
    <div class="bg-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-md">

      <h2 class="text-3xl font-bold text-center mb-8 text-white">用户登录</h2>

      <form @submit.prevent="login" class="space-y-6">

        <input v-model="username" type="text" placeholder="邮箱 / 用户名"
          class="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          required />

        <input v-model="password" type="password" placeholder="密码"
          class="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          required />

        <p v-if="success" class="text-green-400 text-center mt-3">登录成功！</p>
        <p v-if="errorMsg" class="text-red-400 text-center mt-3">{{ errorMsg }}</p>

        <button type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-150">
          登录
        </button>

        <div class="text-center pt-2">
          <router-link to="/register" class="text-blue-400 hover:text-blue-300 text-sm">
            还没有账号？去注册
          </router-link>
        </div>

      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import http from '@/utils/http'
import API_BASE_URL from '@/config/api.ts'


const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const username = ref(''); // 用于绑定用户名或邮箱
const password = ref('');
const errorMsg = ref('');
const success = ref(false)

onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push('/user')
  }
})

const login = async () => {
  errorMsg.value = ''; // 登录前清除错误信息

  if (!username.value || !password.value) {
    errorMsg.value = '请输入用户名/邮箱和密码。';
    return;
  }

  try {
    // 这里添加实际的登录请求
    const res = await http.post(`${API_BASE_URL}/api/auth/login`, {
      username: username.value,
      password: password.value
    })

    console.log(res)

    if (res.token) {
      authStore.setToken(res.token)
      authStore.setUser(res.user)
      success.value = true

      setTimeout(() => {
        router.push('/user')
      }, 1500)
    }
  } catch (error) {
    console.error('登录失败:', error)
    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          errorMsg.value = error.response.data.errors?.[0]?.msg || '输入数据有误，请检查'
          break;
        case 401:
          errorMsg.value = error.response.data.message || '账号或密码错误'
          break;
        case 500:
          errorMsg.value = '网络错误'
          break;
        default:
          errorMsg.value = '错误的响应码'
      }
    } else {
      // 请求发送失败，比如网络中断
      errorMsg.value = '网络错误'
    }
  }
};
</script>
