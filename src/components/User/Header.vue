<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
    <div class="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div class="flex items-center">
        <!-- 汉堡按钮：仅手机显示，用于打开侧边栏 -->
        <button
          class="md:hidden mr-3 inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          aria-label="打开侧边栏"
          @click="$emit('toggleMobileSidebar')"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="1.5" d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>

        <!-- Logo 返回首页 -->
        <router-link to="/" class="flex items-center space-x-2 group">
          <svg class="h-7 w-7 text-blue-600 group-hover:opacity-90 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657-3.47 3-7.5 3s-7.5-1.343-7.5-3" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 12h.01" />
          </svg>
          <span class="font-bold text-lg text-gray-800 group-hover:text-gray-900">IPNEXO</span>
        </router-link>
      </div>

      <!-- 右侧区：可放用户菜单等 -->
      <div class="flex items-center space-x-3">
        <!-- 这里保留你已有的 <UserMenu /> -->
        <UserMenu />
      </div>
    </div>
  </header>
</template>

<script setup>

import UserMenu from './UserMenu.vue'

defineEmits(['toggleMobileSidebar'])

</script>