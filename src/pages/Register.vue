<template>
  <div class="min-h-screen gradient-bg flex items-center justify-center">
    <div class="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 md:p-10 w-full max-w-md">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900">用户注册</h2>

      <form @submit.prevent="register" class="space-y-6">
        <!-- 手机号 -->
        <div>
          <input
            v-model="phone"
            type="tel"
            inputmode="numeric"
            placeholder="手机号"
            class="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
          <p v-if="phone && !isPhoneValid" class="text-xs text-red-600 mt-1">请输入有效的手机号</p>
        </div>

        <!-- 验证码 + 发送 -->
        <div class="flex gap-3">
          <input
            v-model="phoneCode"
            type="text"
            inputmode="numeric"
            placeholder="短信验证码"
            class="flex-1 p-3 border border-gray-300 bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
          <button
            type="button"
            :disabled="!isPhoneValid || sendingCode || codeCountdown > 0"
            @click="sendCode"
            class="px-4 min-w-[7.5rem] py-3 rounded-lg font-semibold border transition
                   disabled:opacity-60 disabled:cursor-not-allowed
                   text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            <span v-if="codeCountdown === 0 && !sendingCode">发送验证码</span>
            <span v-else-if="sendingCode">发送中...</span>
            <span v-else>{{ codeCountdown }}s 后重发</span>
          </button>
        </div>
        <p v-if="codeTip" class="text-xs text-green-600 -mt-4">{{ codeTip }}</p>

        <!-- 密码 -->
        <input
          v-model="password"
          type="password"
          placeholder="密码"
          class="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />

        <!-- 确认密码 -->
        <div>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="确认密码"
            class="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
          <p
            v-if="confirmPassword && password && !isPasswordMatch"
            class="text-xs text-red-600 mt-1"
          >
            两次输入的密码不一致
          </p>
        </div>

        <!-- 邀请码（选填，若通过推广链接进入将被锁定） -->
        <div>
          <input
            v-model="inviteCode"
            type="text"
            placeholder="邀请码（选填）"
            :readonly="inviteLocked"
            :title="inviteLocked ? '来自推广链接，已锁定' : '可选填'"
            class="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition"
            :class="{ 'bg-gray-50 text-gray-700 cursor-not-allowed': inviteLocked }"
          />
          <p v-if="inviteLocked" class="text-xs text-gray-500 mt-1">
            已从推广链接自动填充：{{ inviteCode }}（不可修改）
          </p>
        </div>

        <p v-if="success" class="text-green-600 text-center mt-1">注册成功！正在跳转...</p>
        <p v-if="errorMsg" class="text-red-600 text-center mt-1">{{ errorMsg }}</p>

        <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition
         disabled:opacity-60 disabled:cursor-not-allowed"
        >
          注册
        </button>

        <div class="text-center pt-1">
          <router-link to="/login" class="text-blue-600 hover:text-blue-700 text-sm">
            已有账号？去登录
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import http from '@/utils/http'
import API_BASE_URL from '@/config/api.ts'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const password = ref('')
const confirmPassword = ref('')

const phone = ref('')
const phoneCode = ref('')
const inviteCode = ref('')

const inviteLocked = ref(false)

const errorMsg = ref('')
const success = ref(false)

const sendingCode = ref(false)
const codeCountdown = ref(0)
const codeTip = ref('')

let countdownTimer = null

// 手机号校验（可按需切换为 /^1\\d{10}$/）
const isPhoneValid = computed(() => /^\d{6,15}$/.test((phone.value || '').trim()))
const isPasswordMatch = computed(() => (password.value || '') === (confirmPassword.value || ''))

// 表单是否可提交（不包含邀请码；去掉用户名/邮箱）
const isFormValid = computed(() =>
  Boolean(
    isPhoneValid.value &&
    phoneCode.value.trim() &&
    password.value &&
    confirmPassword.value &&
    isPasswordMatch.value
  )
)

// 推广参数锁定邀请码
onMounted(() => {
  const qRef = route.query.ref
  const refStr = Array.isArray(qRef) ? qRef[0] : qRef
  if (typeof refStr === 'string' && refStr.trim()) {
    inviteCode.value = refStr.trim()
    inviteLocked.value = true
  }
})

const startCountdown = (seconds = 60) => {
  codeCountdown.value = seconds
  countdownTimer && clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    if (codeCountdown.value <= 1) {
      clearInterval(countdownTimer)
      countdownTimer = null
      codeCountdown.value = 0
      return
    }
    codeCountdown.value -= 1
  }, 1000)
}

const sendCode = async () => {
  errorMsg.value = ''
  codeTip.value = ''
  if (!isPhoneValid.value) {
    errorMsg.value = '请输入有效的手机号后再发送验证码。'
    return
  }
  if (sendingCode.value || codeCountdown.value > 0) return
  sendingCode.value = true
  try {
    // http 已返回 data，这里直接得到后端对象
    const res = await http.post(`${API_BASE_URL}/api/auth/send-code`, {
      phone: phone.value.trim()
    })
    codeTip.value = res?.message || '验证码已发送，请注意查收短信。'
    startCountdown(60)
  } catch (err) {
    console.error('发送验证码错误详情:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data
    })
    errorMsg.value = err.response?.data?.message || '发送验证码失败，请稍后再试。'
  } finally {
    sendingCode.value = false
  }
}

const register = async () => {
  errorMsg.value = ''
  codeTip.value = ''
  if (!isPhoneValid.value) {
    errorMsg.value = '请输入有效的手机号。'
    return
  }
  if (!phoneCode.value.trim()) {
    errorMsg.value = '请输入短信验证码。'
    return
  }
  if (!password.value || !confirmPassword.value || password.value !== confirmPassword.value) {
    errorMsg.value = '两次输入的密码不一致。'
    return
  }

  try {
    const payload = {
      password: password.value,
      phone: phone.value.trim(),
      phoneCode: phoneCode.value.trim()
    }
    if (inviteCode.value && inviteCode.value.trim()) {
      payload.inviteCode = inviteCode.value.trim()
    }

    const res = await http.post(`${API_BASE_URL}/api/auth/register`, payload)
    console.log('注册响应:', res)

    if (res.token) {
      authStore.setToken(res.token)
      authStore.setUser(res.user)
      success.value = true
      setTimeout(() => router.push('/user'), 1500)
    } else {
      success.value = true
      setTimeout(() => router.push('/login'), 1200)
    }
  } catch (err) {
    console.error('注册错误详情:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data
    })
    errorMsg.value = err.response?.data?.message || '注册失败，请稍后再试。'
  }
}

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>

