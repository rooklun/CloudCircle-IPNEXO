<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">账号设置</h2>

    <!-- 基本资料 -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 max-w-3xl space-y-4">
      <h3 class="text-sm font-semibold text-gray-900">基本资料</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">昵称</label>
          <input v-model="profile.nickname" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">邮箱</label>
          <input v-model="profile.email" type="email" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">手机号</label>
          <input v-model="profile.phone" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="px-5 py-2.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800" @click="saveProfile">保存</button>
        <span v-if="msg.profile" class="text-sm text-green-600">{{ msg.profile }}</span>
      </div>
    </div>

    <!-- 修改密码 -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 max-w-3xl space-y-4">
      <h3 class="text-sm font-semibold text-gray-900">修改密码</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">当前密码</label>
          <input v-model="pwd.old" type="password" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">新密码</label>
          <input v-model="pwd.new1" type="password" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
        </div>
        <div class="sm:col-span-2">
          <label class="block text-sm text-gray-600 mb-1">确认新密码</label>
          <input v-model="pwd.new2" type="password" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"/>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="px-5 py-2.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800" @click="changePwd">保存</button>
        <span v-if="msg.pwd" :class="['text-sm', msg.pwdOk ? 'text-green-600' : 'text-red-600']">{{ msg.pwd }}</span>
      </div>
    </div>

    <!-- 安全设置 -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl space-y-4">
      <h3 class="text-sm font-semibold text-gray-900">安全</h3>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-900">两步验证（2FA）</p>
          <p class="text-xs text-gray-600">提升账号安全，登录时需验证码</p>
        </div>
        <button
          class="px-4 py-2 rounded-md"
          :class="twoFA ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black border border-black hover:bg-gray-50'"
          @click="toggle2FA"
        >
          {{ twoFA ? '已开启' : '未开启' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const profile = reactive({ nickname: '', email: '', phone: '' })
const pwd = reactive({ old: '', new1: '', new2: '' })
const twoFA = ref(false)
const msg = reactive({ profile: '', pwd: '', pwdOk: false })

const saveProfile = async () => {
  // TODO: 调用接口保存
  msg.profile = '已保存'
  setTimeout(() => (msg.profile = ''), 1500)
}
const changePwd = async () => {
  if (!pwd.old || !pwd.new1 || pwd.new1 !== pwd.new2) {
    msg.pwd = '请检查密码输入'; msg.pwdOk = false; return
  }
  // TODO: 调用接口修改
  msg.pwdOk = true; msg.pwd = '修改成功'
  setTimeout(() => (msg.pwd = ''), 1500)
}
const toggle2FA = async () => {
  twoFA.value = !twoFA.value
  // TODO: 接口开关
}
</script>