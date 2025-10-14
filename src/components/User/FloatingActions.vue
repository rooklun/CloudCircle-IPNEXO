<template>
  <div class="fixed right-4 bottom-1/2 translate-y-1/2 flex flex-col items-center space-y-3">
      <button v-for="action in floatingActions" :key="action.name"
        class="w-12 h-12 bg-[#161B22] border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-50 hover:border-gray-50 transition-all duration-200 group relative">
        <component :is="action.icon" class="h-6 w-6" />
        <span
          class="absolute right-full mr-3 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {{ action.name }}
        </span>
      </button>
      <div class="w-8 h-px bg-gray-700 my-1"></div>
      <button
        class="w-12 h-12 bg-gray-50 border border-gray-50 rounded-full flex items-center justify-center text-gray-950 hover:bg-gray-50 transition-all duration-200 group relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
        <span
          class="absolute right-full mr-3 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          回到顶部
        </span>
      </button>
    </div>
</template>

<script setup>
import { shallowRef } from 'vue'
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

const floatingActions = shallowRef([
  { name: '在线客服', icon: ChatBubbleLeftRightIcon },
  { name: '联系我们', icon: PaperAirplaneIcon },
  { name: '刷新页面', icon: ArrowPathIcon },
]);
</script>