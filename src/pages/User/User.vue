<template>
  <div class="bg-[#0A0F1C] text-gray-300 font-sans min-h-screen flex flex-col">
    <!-- 头部 -->
    <Header />
    
    <!-- 主体内容区域 -->
    <div class="flex flex-1">
      <!-- 侧边栏 -->
      <Sidebar />
      <!-- 主内容区 -->
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
    
    <FloatingActions />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/User/Sidebar.vue'
import Header from '@/components/User/Header.vue'
import MainContent from '@/components/User/MainContent.vue'
import FloatingActions from '@/components/User/FloatingActions.vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
  }
})
</script>