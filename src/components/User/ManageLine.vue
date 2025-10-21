<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">管理专线</h2>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <input v-model="search" placeholder="搜索 专线ID/地区/运营商..." class="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800 w-full sm:max-w-xs" />
        <div class="text-sm text-gray-600">共 {{ filtered.length }} 条</div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-gray-600 border-b border-gray-200">
              <th class="pb-3 px-4">专线ID</th>
              <th class="pb-3 px-4">运营商</th>
              <th class="pb-3 px-4">带宽</th>
              <th class="pb-3 px-4">地区</th>
              <th class="pb-3 px-4">到期时间</th>
              <th class="pb-3 px-4">状态</th>
              <th class="pb-3 px-4">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="line in filtered" :key="line.id" class="border-b border-gray-100 text-sm hover:bg-gray-50">
              <td class="py-3 px-4 text-gray-800">{{ line.id }}</td>
              <td class="py-3 px-4 text-gray-800">{{ line.carrier }}</td>
              <td class="py-3 px-4 text-gray-800">{{ line.bandwidth }} Mbps</td>
              <td class="py-3 px-4 text-gray-800">{{ line.region }}</td>
              <td class="py-3 px-4 text-gray-800">{{ fmt(line.expireAt) }}</td>
              <td class="py-3 px-4">
                <span :class="line.active ? 'text-green-700' : 'text-red-700'">{{ line.active ? '运行中' : '已停用' }}</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  <button class="px-3 py-1.5 rounded bg-neutral-900 text-white hover:bg-neutral-800" @click="renew(line)">续费</button>
                  <button class="px-3 py-1.5 rounded bg-neutral-900 text-white hover:bg-neutral-800" @click="toggle(line)">{{ line.active ? '停用' : '启用' }}</button>
                  <button class="px-3 py-1.5 rounded bg-neutral-900 text-white hover:bg-neutral-800" @click="remove(line)">删除</button>
                </div>
              </td>
            </tr>
            <tr v-if="!filtered.length">
              <td colspan="7" class="py-8 text-center text-gray-500">暂无数据</td>
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
const list = ref([
  { id: 'LX2025001', carrier: '电信', bandwidth: 100, region: '华东', expireAt: new Date(), active: true },
])
const filtered = computed(() => {
  if (!search.value) return list.value
  const s = search.value.toLowerCase()
  return list.value.filter(x =>
    x.id.toLowerCase().includes(s) ||
    x.carrier.includes(search.value) ||
    x.region.includes(search.value)
  )
})
const fmt = (d) => new Date(d).toLocaleString('zh-CN')
const renew = (line) => { /* TODO */ }
const toggle = (line) => { line.active = !line.active }
const remove = (line) => { list.value = list.value.filter(l => l.id !== line.id) }
</script>