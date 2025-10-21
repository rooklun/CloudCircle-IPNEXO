<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">推广合作</h2>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl space-y-6">
      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3">我的推广链接</h3>
        <div class="flex flex-col sm:flex-row gap-2">
          <input :value="refLink" readonly class="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800"/>
          <button class="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800" @click="copy(refLink)">复制</button>
        </div>
        <p class="text-xs text-gray-500 mt-2">将链接分享给好友，成功注册并产生消费后可获得佣金。</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white border border-gray-200 rounded-md p-4">
          <p class="text-xs text-gray-600">累计点击</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.clicks }}</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-md p-4">
          <p class="text-xs text-gray-600">注册用户</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.signups }}</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-md p-4">
          <p class="text-xs text-gray-600">累计佣金(¥)</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.earnings }}</p>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3">佣金记录</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left text-gray-600 border-b border-gray-200">
                <th class="pb-3 px-4">时间</th>
                <th class="pb-3 px-4">来源订单</th>
                <th class="pb-3 px-4">金额(¥)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(c, i) in commissions" :key="i" class="border-b border-gray-100 text-sm">
                <td class="py-3 px-4 text-gray-800">{{ fmt(c.time) }}</td>
                <td class="py-3 px-4 text-gray-800">{{ c.orderId }}</td>
                <td class="py-3 px-4 text-gray-800">{{ c.amount }}</td>
              </tr>
              <tr v-if="!commissions.length">
                <td colspan="3" class="py-8 text-center text-gray-500">暂无佣金记录</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex gap-3">
        <button class="px-5 py-2.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800">申请提现</button>
        <button class="px-5 py-2.5 rounded-md bg-white text-black border border-black hover:bg-gray-50">查看规则</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const code = 'ABC123'
const refLink = computed(() => `${location.origin}/register?ref=${code}`)
const stats = reactive({ clicks: 0, signups: 0, earnings: 0 })
const commissions = reactive([])
const fmt = (d) => new Date(d).toLocaleString('zh-CN')
const copy = async (v) => { await navigator.clipboard.writeText(v) }
</script>