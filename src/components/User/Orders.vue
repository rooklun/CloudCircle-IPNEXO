<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">订单管理</h2>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div class="flex gap-2 w-full sm:w-auto">
          <input v-model="search" placeholder="搜索 订单号/产品..."
                 class="flex-1 sm:w-64 bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
          <select v-model="status" class="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800">
            <option value="">全部状态</option>
            <option value="paid">已支付</option>
            <option value="unpaid">未支付</option>
            <option value="refunded">已退款</option>
          </select>
        </div>
        <div class="text-sm text-gray-600">共 {{ filtered.length }} 条</div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-gray-600 border-b border-gray-200">
              <th class="pb-3 px-4">订单号</th>
              <th class="pb-3 px-4">产品</th>
              <th class="pb-3 px-4">金额</th>
              <th class="pb-3 px-4">状态</th>
              <th class="pb-3 px-4">创建时间</th>
              <th class="pb-3 px-4">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in filtered" :key="o.id" class="border-b border-gray-100 text-sm hover:bg-gray-50">
              <td class="py-3 px-4 text-gray-800">{{ o.id }}</td>
              <td class="py-3 px-4 text-gray-800">{{ o.product }}</td>
              <td class="py-3 px-4 text-gray-800">¥ {{ o.amount }}</td>
              <td class="py-3 px-4">
                <span :class="o.status === 'paid' ? 'text-green-700' : o.status === 'unpaid' ? 'text-yellow-700' : 'text-gray-700'">
                  {{ statusMap[o.status] || o.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-gray-800">{{ fmt(o.createdAt) }}</td>
              <td class="py-3 px-4">
                <button class="px-3 py-1.5 rounded bg-neutral-900 text-white hover:bg-neutral-800">查看</button>
              </td>
            </tr>
            <tr v-if="!filtered.length">
              <td colspan="6" class="py-8 text-center text-gray-500">暂无订单</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const search = ref('')
const status = ref('')
const statusMap = { paid: '已支付', unpaid: '未支付', refunded: '已退款' }
const list = ref([
  { id: 'OD2025001', product: '静态住宅-购买IP', amount: 48, status: 'paid', createdAt: new Date() },
  { id: 'OD2025002', product: '专线-100Mbps', amount: 299, status: 'unpaid', createdAt: new Date() },
])
const filtered = computed(() => {
  const s = search.value.trim().toLowerCase()
  return list.value.filter(o => {
    const hit = !s || o.id.toLowerCase().includes(s) || o.product.toLowerCase().includes(s)
    const st = !status.value || o.status === status.value
    return hit && st
  })
})
const fmt = (d) => new Date(d).toLocaleString('zh-CN')
</script>