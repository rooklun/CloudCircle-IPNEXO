<template>
  <header class="bg-white border-b border-gray-200">
    <div class="h-16 px-6 md:px-8 flex items-center justify-between">
      <div class="text-2xl font-bold text-gray-900">IPNEXO</div>

      <!-- 顶部导航（示例，可按需修改/隐藏） -->
      <nav class="hidden md:flex items-center space-x-6 text-sm">
        <router-link to="/" class="text-gray-600 hover:text-gray-900">首页</router-link>
        <a href="#services" class="text-gray-600 hover:text-gray-900">产品服务</a>
        <a href="#contact" class="text-gray-600 hover:text-gray-900">联系我们</a>
      </nav>

      <UserMenu />
    </div>
  </header>
</template>

<script setup>
import UserMenu from './UserMenu.vue'
</script>