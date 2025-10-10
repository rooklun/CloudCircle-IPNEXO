<template>
  <div class="min-h-screen flex items-center justify-center bg-transparent">
    <div class="bg-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-md">
      
      <h2 class="text-3xl font-bold text-center mb-8 text-white">用户登录</h2>
      
      <form @submit.prevent="login" class="space-y-6">
        
        <input 
          v-model="loginIdentifier" 
          type="text" 
          placeholder="邮箱 / 用户名" 
          class="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-150" 
          required 
        />
        
        <input 
          v-model="password" 
          type="password" 
          placeholder="密码" 
          class="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-150" 
          required 
        />
        
        <p v-if="errorMsg" class="text-red-400 text-center mt-3">{{ errorMsg }}</p>
        
        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-150"
        >
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
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
// 💡 注意：你需要确保你的 Vue Router 已经配置了 '/register' 路径

const loginIdentifier = ref(''); // 用于绑定用户名或邮箱
const password = ref('');
const errorMsg = ref('');

const router = useRouter(); // 如果你需要登录成功后跳转

const login = () => {
  errorMsg.value = ''; // 登录前清除错误信息
  
  if (!loginIdentifier.value || !password.value) {
    errorMsg.value = '请输入用户名/邮箱和密码。';
    return;
  }
  
  // ===========================================
  // 🚀 实际登录逻辑 (这里是你调用后端 API 的地方)
  // ===========================================
  
  // 模拟 API 调用成功
  if (loginIdentifier.value === 'test' && password.value === '123456') {
    // 假设登录成功，并跳转到首页
    console.log('登录成功！');
    router.push('/'); 
    
  } else {
    // 假设登录失败
    errorMsg.value = '登录失败：用户名或密码不正确。';
  }
};
</script>