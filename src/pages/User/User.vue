<template>
  <div class="bg-white text-gray-900 min-h-screen flex flex-col">
    <!-- 头部 -->
    <Header @toggleMobileSidebar="isMobileSidebarOpen = true" />

    <!-- 主体 -->
    <div class="flex flex-1">
      <!-- 侧边栏：桌面固定，移动抽屉 -->
      <Sidebar
        :mobile-open="isMobileSidebarOpen"
        @closeMobile="isMobileSidebarOpen = false"
      />

      <!-- 主内容：移动端留内边距，桌面更宽舒适 -->
      <main class="flex-1 p-4 sm:p-5 md:p-6 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/User/Sidebar.vue'
import Header from '@/components/User/Header.vue'

const router = useRouter()
const authStore = useAuthStore()

const isMobileSidebarOpen = ref(false)

onMounted(() => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
  }
})
</script>