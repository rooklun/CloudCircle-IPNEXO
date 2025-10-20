<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">管理IP</h2>

    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex justify-between mb-4">
        <div class="flex space-x-4">
          <!-- 搜索框 -->
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索..."
            class="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"
          >
        </div>

        <!-- 排序按钮（黑底白字） -->
        <button
          @click="toggleSort"
          class="flex items-center space-x-1 px-3 py-2 bg-neutral-900 rounded-md text-white hover:bg-neutral-800 transition-colors"
        >
          <span>到期时间</span>
          <ArrowsUpDownIcon class="h-4 w-4" />
        </button>
      </div>

      <!-- IP列表 -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-gray-600 border-b border-gray-200">
              <th class="pb-3 px-4">国家/地区</th>
              <th class="pb-3 px-4">协议</th>
              <th class="pb-3 px-4">代理地址:端口</th>
              <th class="pb-3 px-4">账号</th>
              <th class="pb-3 px-4">密码</th>
              <th class="pb-3 px-4">匹配时间</th>
              <th class="pb-3 px-4">到期时间</th>
              <th class="pb-3 px-4">状态</th>
              <th class="pb-3 px-4">自动续费</th>
              <th class="pb-3 px-4">备注</th>
              <th class="pb-3 px-4">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="ip in sortedIPs"
              :key="ip.id"
              class="border-b border-gray-100 text-sm hover:bg-gray-50"
            >
              <td class="py-4 px-4 text-gray-800">{{ ip.country }}</td>
              <td class="py-4 px-4 text-gray-800">{{ ip.protocol }}</td>
              <td class="py-4 px-4 text-gray-800">{{ ip.address }}:{{ ip.port }}</td>
              <td class="py-4 px-4 text-gray-800">{{ ip.username }}</td>
              <td class="py-4 px-4">
                <span class="text-gray-500">******</span>
                <button
                  @click="copyPassword(ip.password)"
                  class="ml-2 px-2 py-1 rounded bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                >
                  复制
                </button>
              </td>
              <td class="py-4 px-4 text-gray-800">{{ formatDate(ip.matchTime) }}</td>
              <td class="py-4 px-4 text-gray-800">{{ formatDate(ip.expireTime) }}</td>
              <td class="py-4 px-4">
                <span :class="getStatusClass(ip.status)">
                  {{ ip.status }}
                </span>
              </td>
              <td class="py-4 px-4">
                <Switch
                  v-model="ip.autoRenew"
                  @change="updateAutoRenew(ip)"
                  class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                  :class="ip.autoRenew ? 'bg-neutral-900' : 'bg-gray-300'"
                >
                  <span class="sr-only">自动续费</span>
                  <span
                    :class="ip.autoRenew ? 'translate-x-5' : 'translate-x-1'"
                    class="inline-block h-3 w-3 transform rounded-full bg-white transition"
                  />
                </Switch>
              </td>
              <td class="py-4 px-4 text-gray-800">{{ ip.note }}</td>
              <td class="py-4 px-4">
                <div class="flex items-center space-x-2">
                  <button
                    @click="renewIP(ip)"
                    class="px-3 py-1.5 rounded bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                  >
                    续费
                  </button>
                  <button
                    @click="deleteIP(ip)"
                    class="px-3 py-1.5 rounded bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ArrowsUpDownIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'
import http from '@/utils/http'

const ips = ref([])
const searchQuery = ref('')
const sortDirection = ref('asc')

// 获取IP列表
const fetchIPs = async () => {
  try {
    const res = await http.get('/api/ips')
    ips.value = res.data
  } catch (err) {
    console.error('获取IP列表失败:', err)
  }
}

// 排序和筛选
const sortedIPs = computed(() => {
  let filtered = ips.value

  if (searchQuery.value) {
    filtered = filtered.filter(ip =>
      ip.country.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ip.address.includes(searchQuery.value)
    )
  }

  return filtered.sort((a, b) => {
    const timeA = new Date(a.expireTime).getTime()
    const timeB = new Date(b.expireTime).getTime()
    return sortDirection.value === 'asc' ? timeA - timeB : timeB - timeA
  })
})

const toggleSort = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN')
}

// 状态样式（浅色主题）
const getStatusClass = (status) => {
  const classes = {
    '活跃': 'text-green-700',
    '即将到期': 'text-yellow-700',
    '已过期': 'text-red-700'
  }
  return classes[status] || 'text-gray-600'
}

// 复制密码
const copyPassword = (password) => {
  navigator.clipboard.writeText(password)
}

// 更新自动续费状态
const updateAutoRenew = async (ip) => {
  try {
    await http.patch(`/api/ips/${ip.id}`, {
      autoRenew: ip.autoRenew
    })
  } catch (err) {
    console.error('更新自动续费状态失败:', err)
  }
}

// 续费IP
const renewIP = async (ip) => {
  // TODO: 实现续费逻辑
}

// 删除IP
const deleteIP = async (ip) => {
  // TODO: 实现删除逻辑
}

// 初始化
// onMounted(() => {
//   fetchIPs()
// })
</script>