<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold text-white mb-6">管理IP</h2>
    
    <div class="bg-[#111827] rounded-lg p-6">
      <div class="flex justify-between mb-4">
        <div class="flex space-x-4">
          <!-- 搜索框 -->
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索..."
            class="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
        </div>
        
        <!-- 排序按钮 -->
        <button
          @click="toggleSort"
          class="flex items-center space-x-1 px-3 py-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600"
        >
          <span>到期时间</span>
          <ArrowsUpDownIcon class="h-4 w-4" />
        </button>
      </div>

      <!-- IP列表 -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-gray-400 border-b border-gray-700">
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
              class="border-b border-gray-700/50 text-sm"
            >
              <td class="py-4 px-4">{{ ip.country }}</td>
              <td class="py-4 px-4">{{ ip.protocol }}</td>
              <td class="py-4 px-4">{{ ip.address }}:{{ ip.port }}</td>
              <td class="py-4 px-4">{{ ip.username }}</td>
              <td class="py-4 px-4">
                <span class="text-gray-500">******</span>
                <button @click="copyPassword(ip.password)" class="ml-2 text-cyan-500 hover:text-cyan-400">
                  复制
                </button>
              </td>
              <td class="py-4 px-4">{{ formatDate(ip.matchTime) }}</td>
              <td class="py-4 px-4">{{ formatDate(ip.expireTime) }}</td>
              <td class="py-4 px-4">
                <span :class="getStatusClass(ip.status)">
                  {{ ip.status }}
                </span>
              </td>
              <td class="py-4 px-4">
                <Switch
                  v-model="ip.autoRenew"
                  @change="updateAutoRenew(ip)"
                  class="relative inline-flex h-5 w-9 items-center rounded-full"
                  :class="ip.autoRenew ? 'bg-cyan-600' : 'bg-gray-700'"
                >
                  <span class="sr-only">自动续费</span>
                  <span
                    :class="ip.autoRenew ? 'translate-x-5' : 'translate-x-1'"
                    class="inline-block h-3 w-3 transform rounded-full bg-white transition"
                  />
                </Switch>
              </td>
              <td class="py-4 px-4">{{ ip.note }}</td>
              <td class="py-4 px-4">
                <button
                  @click="renewIP(ip)"
                  class="text-cyan-500 hover:text-cyan-400 mr-2"
                >
                  续费
                </button>
                <button
                  @click="deleteIP(ip)"
                  class="text-red-500 hover:text-red-400"
                >
                  删除
                </button>
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

// 获取状态样式
const getStatusClass = (status) => {
  const classes = {
    '活跃': 'text-green-400',
    '即将到期': 'text-yellow-400',
    '已过期': 'text-red-400'
  }
  return classes[status] || 'text-gray-400'
}

// 复制密码
const copyPassword = (password) => {
  navigator.clipboard.writeText(password)
  // 添加提示
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
  // 实现续费逻辑
}

// 删除IP
const deleteIP = async (ip) => {
  // 实现删除逻辑
}

// 初始化
// onMounted(() => {
//   fetchIPs()
// })
</script>