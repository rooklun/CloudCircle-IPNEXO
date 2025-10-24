<template>
  <div class="min-h-screen gradient-bg flex items-center justify-center">
    <div class="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 md:p-10 w-full max-w-md">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900">用户登录</h2>

      <form @submit.prevent="login" class="space-y-6">
        <input
          v-model="phone"
          type="tel"
          inputmode="numeric"
          placeholder="手机号"
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

        <p v-if="success" class="text-green-600 text-center mt-1">登录成功！</p>
        <p v-if="errorMsg" class="text-red-600 text-center mt-1">{{ errorMsg }}</p>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          登录
        </button>

        <div class="text-center pt-1">
          <router-link to="/register" class="text-blue-600 hover:text-blue-700 text-sm">
            还没有账号？去注册
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import http from '@/utils/http';
import API_BASE_URL from '@/config/api.ts';

const router = useRouter();
const authStore = useAuthStore();

const phone = ref('');
const password = ref('');
const errorMsg = ref('');
const success = ref(false);

onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push('/user')
  }
});

const login = async () => {
  errorMsg.value = '';

  if (!phone.value || !password.value) {
    errorMsg.value = '请输入手机号和密码。';
    return;
  }

  try {
    // http 拦截器已返回 res.data，这里拿到的是后端数据对象
    const data = await http.post(`${API_BASE_URL}/api/auth/login`, {
      phone: phone.value.trim(),
      password: password.value
    });

    console.log('登录响应:', data);

    if (data.token) {
      authStore.setToken(data.token);
      authStore.setUser(data.user);
      success.value = true;
      setTimeout(() => router.push('/user'), 1200);
    } else {
      errorMsg.value = data?.message || '登录失败，请稍后再试';
    }
  } catch (error) {
    console.error('登录失败:', error);
    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          errorMsg.value = error.response.data.errors?.[0]?.msg || '输入数据有误，请检查';
          break;
        case 401:
          errorMsg.value = error.response.data.message || '手机号或密码错误';
          break;
        default:
          errorMsg.value = '网络错误';
      }
    } else {
      errorMsg.value = '网络错误';
    }
  }
};
</script>
