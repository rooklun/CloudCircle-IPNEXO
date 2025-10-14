<template>
  <header class="h-16 bg-[#111827]/90 backdrop-blur-sm border-b border-gray-800 flex items-center justify-between px-8">
    <div class="h-16 flex items-center justify-center text-2xl font-bold text-white border-b border-gray-800">
      <span>IPNEXO</span>
    </div>
    <div class="flex items-center space-x-6 text-sm">
      <a href="#" class="text-gray-300 hover:text-white transition-colors">海外代理IP</a>
      <a href="#" class="text-gray-300 hover:text-white transition-colors">跨境网络专线</a>
      <a href="#" class="text-gray-300 hover:text-white transition-colors">用户教程</a>
      <a href="#" class="text-gray-300 hover:text-white transition-colors">资源中心</a>
      <a href="#" class="text-gray-300 hover:text-white transition-colors">代理合作</a>
    </div>
    <UserMenu />
  </header>
</template>

<script setup>
import UserMenu from './UserMenu.vue'
</script>