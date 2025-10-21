<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">帮助中心</h2>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <input
          v-model="query"
          placeholder="搜索问题、关键词..."
          class="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <div class="text-sm text-gray-600">共 {{ filtered.length }} 篇</div>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, idx) in filtered"
          :key="idx"
          class="border border-gray-200 rounded-md"
        >
          <button
            class="w-full flex items-center justify-between px-4 py-3 text-left"
            @click="toggle(idx)"
          >
            <span class="font-medium text-gray-900">{{ item.q }}</span>
            <svg class="w-5 h-5 text-gray-500 transition-transform" :class="{ 'rotate-180': open === idx }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd" />
            </svg>
          </button>
          <div v-show="open === idx" class="px-4 pb-4 text-sm text-gray-700">
            <p class="leading-6 whitespace-pre-line">{{ item.a }}</p>
          </div>
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <router-link to="/user/orders" class="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800">查看订单</router-link>
        <router-link to="/user/affiliate" class="px-4 py-2 rounded-md bg-white text-black border border-black hover:bg-gray-50">推广合作</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const query = ref('')
const open = ref(-1)
const list = ref([
  { q: '如何购买静态住宅IP？', a: '进入 用户中心 -> 静态住宅 -> 购买IP，选择国家、数量并支付即可。' },
  { q: '专线如何续费/管理？', a: '前往 用户中心 -> 直播/运营商专线 -> 管理专线，可进行续费、停用、删除等操作。' },
  { q: '如何提取动态住宅的代理？', a: '用户中心 -> 动态住宅 -> 提取流量，选择协议与地区后生成代理信息。' },
  { q: '发票与售后支持', a: '如需发票或技术支持，请在“帮助与支持”中联系在线客服或提交工单。' }
])
const filtered = computed(() => {
  const s = query.value.trim().toLowerCase()
  if (!s) return list.value
  return list.value.filter(i => i.q.toLowerCase().includes(s) || i.a.toLowerCase().includes(s))
})
const toggle = (idx) => open.value = (open.value === idx ? -1 : idx)
</script>