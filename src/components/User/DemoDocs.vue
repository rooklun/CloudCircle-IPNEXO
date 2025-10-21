<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">DEMO文档</h2>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3">cURL</h3>
        <pre class="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-800 overflow-x-auto">
curl -x http://username:password@proxy.ipnexo.com:8080 https://api.ipify.org?format=json
        </pre>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3">Node.js (axios)</h3>
        <pre class="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-800 overflow-x-auto">const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

const proxy = 'http://username:password@proxy.ipnexo.com:8080';
const agent = new HttpsProxyAgent(proxy);

axios.get('https://api.ipify.org?format=json', { httpsAgent: agent })
  .then(res => console.log(res.data))
  .catch(console.error);
        </pre>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3">Python (requests)</h3>
        <pre class="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-800 overflow-x-auto">import requests

proxies = {
  "http":  "http://username:password@proxy.ipnexo.com:8080",
  "https": "http://username:password@proxy.ipnexo.com:8080",
}

r = requests.get("https://api.ipify.org?format=json", proxies=proxies, timeout=15)
print(r.json())
        </pre>
      </div>

      <div class="flex gap-3">
        <router-link to="/user/traffic-extract" class="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800">生成代理</router-link>
        <router-link to="/user/help" class="px-4 py-2 rounded-md bg-white text-black border border-black hover:bg-gray-50">查看帮助</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// 如需动态替换 username/password/endpoint，可从 Store 读取或接口获取
</script>