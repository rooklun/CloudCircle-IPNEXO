<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">购买流量</h2>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-2xl space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">套餐</label>
          <select v-model="pack" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800">
            <option value="10">10 G</option>
            <option value="50">50 G</option>
            <option value="100">100 G</option>
            <option value="500">500 G</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">协议</label>
          <select v-model="protocol" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800">
            <option>HTTP</option>
            <option>HTTPS</option>
            <option>SOCKS5</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label class="block text-sm text-gray-600 mb-1">国家/地区（可选）</label>
          <input v-model="country" placeholder="如：US/JP/CN 或 留空" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">数量</span>
        <div class="inline-flex items-center border border-gray-300 rounded-md">
          <button class="px-3 py-1 text-gray-700" @click="qty = Math.max(1, qty - 1)">-</button>
          <input class="w-14 text-center py-1 bg-white text-gray-800 focus:outline-none" type="number" min="1" v-model.number="qty" />
          <button class="px-3 py-1 text-gray-700" @click="qty++">+</button>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2">
        <span class="text-gray-600">应付金额</span>
        <span class="text-2xl font-bold text-gray-900">¥ {{ totalPrice }}</span>
      </div>

      <button class="w-full bg-neutral-900 text-white py-3 rounded-md hover:bg-neutral-800 transition-colors btn-rainbow" @click="submit">
        立即购买
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const pack = ref('50')
const protocol = ref('HTTP')
const country = ref('')
const qty = ref(1)
const unit = computed(() => ({ '10': 9, '50': 39, '100': 69, '500': 299 }[pack.value] || 39))
const totalPrice = computed(() => unit.value * qty.value)
const submit = () => { /* TODO: 下单逻辑 */ }
</script>