<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">购买专线</h2>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-2xl space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">运营商</label>
          <select v-model="carrier" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800">
            <option value="ct">电信</option>
            <option value="cm">移动</option>
            <option value="cu">联通</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">带宽</label>
          <select v-model="bandwidth" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800">
            <option value="50">50 Mbps</option>
            <option value="100">100 Mbps</option>
            <option value="200">200 Mbps</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">地区</label>
          <input v-model="region" placeholder="如：华东/美国东部" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800" />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">时长</label>
          <select v-model="months" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800">
            <option :value="1">1 个月</option>
            <option :value="3">3 个月</option>
            <option :value="12">12 个月</option>
          </select>
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
const carrier = ref('ct')
const bandwidth = ref('100')
const region = ref('')
const months = ref(1)
const qty = ref(1)
const unit = computed(() => Number(bandwidth.value) >= 100 ? 299 : 199)
const totalPrice = computed(() => unit.value * months.value * qty.value)
const submit = () => { /* TODO: 下单逻辑 */ }
</script>