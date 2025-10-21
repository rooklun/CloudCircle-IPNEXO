<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">实名认证</h2>

    <!-- 状态提示 -->
    <div v-if="status !== 'unsubmitted'" class="mb-6">
      <div
        :class="[
          'rounded-lg border p-4',
          status === 'approved' ? 'bg-green-50 border-green-200' :
          status === 'rejected' ? 'bg-red-50 border-red-200' :
          'bg-blue-50 border-blue-200'
        ]"
      >
        <p class="text-sm"
           :class="status === 'approved' ? 'text-green-800' : status === 'rejected' ? 'text-red-800' : 'text-blue-800'">
          {{ statusText }}
          <span v-if="reason" class="ml-2 text-gray-600">原因：{{ reason }}</span>
        </p>
      </div>
    </div>

    <!-- 表单卡片 -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">姓名</label>
          <input v-model="name" placeholder="请输入真实姓名"
                 class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">证件类型</label>
          <select v-model="docType"
                  class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800">
            <option value="idcard">身份证</option>
            <option value="passport">护照</option>
            <option value="driver">驾驶证</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">证件号码</label>
          <input v-model="idNumber" placeholder="请输入证件号码"
                 class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">国家/地区</label>
          <input v-model="country" placeholder="如：CN/US/JP"
                 class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
        </div>
      </div>

      <!-- 上传区 -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3">证件照片</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="space-y-2">
            <div class="aspect-[3/2] rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
              <img v-if="frontPreview" :src="frontPreview" class="h-full w-full object-cover" />
              <span v-else class="text-gray-400 text-sm">证件正面</span>
            </div>
            <label class="inline-flex">
              <input type="file" accept="image/*" class="hidden" @change="onFileChange('front', $event)"/>
              <span class="px-3 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer text-sm">上传正面</span>
            </label>
          </div>
          <div class="space-y-2">
            <div class="aspect-[3/2] rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
              <img v-if="backPreview" :src="backPreview" class="h-full w-full object-cover" />
              <span v-else class="text-gray-400 text-sm">证件反面</span>
            </div>
            <label class="inline-flex">
              <input type="file" accept="image/*" class="hidden" @change="onFileChange('back', $event)"/>
              <span class="px-3 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer text-sm">上传反面</span>
            </label>
          </div>
          <div class="space-y-2">
            <div class="aspect-[3/2] rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
              <img v-if="handPreview" :src="handPreview" class="h-full w-full object-cover" />
              <span v-else class="text-gray-400 text-sm">手持证件</span>
            </div>
            <label class="inline-flex">
              <input type="file" accept="image/*" class="hidden" @change="onFileChange('hand', $event)"/>
              <span class="px-3 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer text-sm">上传手持</span>
            </label>
          </div>
        </div>
        <p class="mt-2 text-xs text-gray-500">支持 JPG/PNG，单张不超过 5MB。</p>
      </div>

      <!-- 同意与提交 -->
      <div class="flex items-start gap-2">
        <input id="agree" type="checkbox" v-model="agree" class="mt-1">
        <label for="agree" class="text-sm text-gray-700">我已阅读并同意《实名认证服务协议》</label>
      </div>

      <div class="flex items-center gap-3">
        <button
          class="px-6 py-2.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="loading || !agree || status === 'pending'"
          @click="submit"
        >
          {{ status === 'pending' ? '审核中' : '提交审核' }}
        </button>
        <button
          v-if="status === 'rejected'"
          class="px-6 py-2.5 rounded-md bg-white text-black border border-black hover:bg-gray-50"
          @click="resetForm"
        >
          重新提交
        </button>
        <span v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</span>
        <span v-if="successMsg" class="text-sm text-green-600">{{ successMsg }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import http from '@/utils/http'

const name = ref('')
const docType = ref('idcard')
const idNumber = ref('')
const country = ref('')

const frontFile = ref(null)
const backFile = ref(null)
const handFile = ref(null)
const frontPreview = ref('')
const backPreview = ref('')
const handPreview = ref('')

const agree = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const status = ref('unsubmitted') // unsubmitted | pending | approved | rejected
const reason = ref('')

const statusText = computed(() => ({
  unsubmitted: '未提交实名信息',
  pending: '您的实名认证正在审核中，请耐心等待',
  approved: '实名认证已通过',
  rejected: '实名认证未通过'
}[status.value] || ''))

const onFileChange = (key, e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) { errorMsg.value = '图片不能超过 5MB'; return }
  const url = URL.createObjectURL(file)
  if (key === 'front') { frontFile.value = file; frontPreview.value = url }
  if (key === 'back')  { backFile.value = file;  backPreview.value  = url }
  if (key === 'hand')  { handFile.value = file;  handPreview.value  = url }
}

const validate = () => {
  if (!name.value) return '请填写姓名'
  if (!docType.value) return '请选择证件类型'
  if (!idNumber.value) return '请填写证件号码'
  if (!frontFile.value || !backFile.value || !handFile.value) return '请上传完整的证件照片'
  if (!agree.value) return '请勾选同意协议'
  return ''
}

const submit = async () => {
  errorMsg.value = ''; successMsg.value = ''
  const v = validate()
  if (v) { errorMsg.value = v; return }
  try {
    loading.value = true
    const fd = new FormData()
    fd.append('name', name.value)
    fd.append('docType', docType.value)
    fd.append('idNumber', idNumber.value)
    fd.append('country', country.value)
    fd.append('front', frontFile.value)
    fd.append('back', backFile.value)
    fd.append('hand', handFile.value)
    await http.post('/api/kyc/submit', fd)
    status.value = 'pending'
    successMsg.value = '提交成功，正在审核中'
  } catch (e) {
    errorMsg.value = '提交失败，请稍后重试'
    console.error(e)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  errorMsg.value = ''; successMsg.value = ''
  frontFile.value = backFile.value = handFile.value = null
  frontPreview.value = backPreview.value = handPreview.value = ''
  status.value = 'unsubmitted'; reason.value = ''
}

const fetchStatus = async () => {
  try {
    const { data } = await http.get('/api/kyc/status')
    if (data?.status) status.value = data.status
    if (data?.reason) reason.value = data.reason
  } catch (e) { /* 首次无记录忽略 */ }
}
onMounted(fetchStatus)
</script>