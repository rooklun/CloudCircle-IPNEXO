<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">提取流量</h2>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">国家/地区（可选）</label>
          <input v-model="country" placeholder="如：US/JP/CN 或 留空" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800" />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">协议</label>
          <select v-model="protocol" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800">
            <option>HTTP</option>
            <option>HTTPS</option>
            <option>SOCKS5</option>
          </select>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-md p-4">
        <h3 class="text-sm font-semibold text-gray-900 mb-3">代理信息</h3>
        <div class="space-y-2 text-sm">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">网关</span>
            <code class="text-gray-900">{{ endpoint }}</code>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">账号</span>
            <code class="text-gray-900">{{ username }}</code>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">密码</span>
            <code class="text-gray-900">{{ password }}</code>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <button class="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800" @click="gen">生成代理</button>
          <button class="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800" @click="copy(endpoint)">复制网关</button>
          <button class="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800" @click="copy(username)">复制账号</button>
          <button class="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800" @click="copy(password)">复制密码</button>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-2">cURL 测试</h3>
        <pre class="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-800 overflow-x-auto">{{ curlCmd }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const country = ref('')
const protocol = ref('HTTP')
const endpoint = ref('proxy.ipnexo.com:8080')
const username = ref('user_abcdef')
const password = ref('pass_123456')
const gen = () => {
  // TODO: 按条件重新生成账号/密码/网关
}
const curlCmd = computed(() =>
  `curl -x ${protocol.value.toLowerCase()}://${username.value}:${password.value}@${endpoint.value} https://api.ipify.org?format=json`
)
const copy = async (v) => { await navigator.clipboard.writeText(v) }
</script>