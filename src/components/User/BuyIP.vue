<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">购买静态IP</h2>
    
    <div class="bg-white rounded-lg p-6 max-w-2xl">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 国家/地区选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2">国家/地区</label>
          <select 
            v-model="formData.country"
            class="w-full bg-white border border-gray-900 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            @change="calculatePrice"
          >
            <option v-for="country in countries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
        </div>

        <!-- IP数量 -->
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2">IP购买数量</label>
          <input 
            type="number" 
            v-model="formData.quantity"
            min="1"
            class="w-full bg-white border border-gray-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            @input="calculatePrice"
          >
        </div>

        <!-- 套餐选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2">套餐周期</label>
          <div class="grid grid-cols-4 gap-4">
            <button
              v-for="plan in plans"
              :key="plan.value"
              type="button"
              :class="[
                formData.plan === plan.value
                  ? 'bg-black text-white border border-gray-800'
                  : 'bg-white text-black border border-gray-800 hover:bg-gray-100',
                'px-4 py-2 rounded-md text-sm font-medium transition-colors'
              ]"
              @click="selectPlan(plan.value)"
            >
              {{ plan.label }}
            </button>
          </div>
        </div>

        <!-- 业务用途 -->
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2">业务用途</label>
          <select 
            v-model="formData.usage"
            class="w-full bg-white border border-gray-800 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            @change="calculatePrice"
          >
            <option v-for="usage in usages" :key="usage.value" :value="usage.value">
              {{ usage.label }}
            </option>
          </select>
        </div>

        <!-- 价格显示 -->
        <div class="pt-4 border-t border-gray-700">
          <div class="flex justify-between items-center">
            <span class="text-gray-900">总价：</span>
            <span class="text-2xl font-bold text-gray-900">￥{{ totalPrice }}</span>
          </div>
        </div>

        <!-- 提交按钮 -->
        <button
          type="submit"
          class="w-full bg-black text-white py-3 rounded-md transition-colors font-medium"
        >
          立即支付
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import http from '@/utils/http'

const formData = reactive({
  country: '',
  quantity: 1,
  plan: '1',
  usage: ''
})

const totalPrice = ref(0)

const countries = ref([
  { code: 'US', name: '美国' },
  { code: 'JP', name: '日本' },
  { code: 'KR', name: '韩国' },
  // ...更多国家
])

const plans = [
  { value: '1', label: '1个月' },
  { value: '3', label: '3个月' },
  { value: '6', label: '6个月' },
  { value: '12', label: '12个月' }
]

const usages = [
  { value: 'web', label: '网页浏览' },
  { value: 'api', label: 'API调用' },
  { value: 'crawler', label: '数据采集' }
]

const calculatePrice = async () => {
  try {
    const res = await http.post('/api/calculate-price', formData)
    totalPrice.value = res.data.price
  } catch (err) {
    console.error('计算价格失败:', err)
  }
}

const selectPlan = (plan) => {
  formData.plan = plan
  calculatePrice()
}

const handleSubmit = async () => {
  try {
    const res = await http.post('/api/orders', formData)
    // 处理支付逻辑
  } catch (err) {
    console.error('创建订单失败:', err)
  }
}
</script>