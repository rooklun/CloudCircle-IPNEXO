<template>
    <section id="ContactForm" class="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 md:py-28 overflow-hidden">
        <!-- 装饰性背景元素 -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        
        <div class="container mx-auto px-6 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                    <div class="inline-block mb-4">
                        <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                            联系我们
                        </span>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        联系 IPNEXO
                    </h2>
                    <p class="mt-6 text-lg text-gray-600 leading-relaxed">
                        我们随时准备好响应您的网络需求，并为您提供专业的解决方案。请联系我们，共同开启高效、稳定的全球网络之旅。
                    </p>
                    
                    <!-- 美化后的表单卡片 -->
                    <div class="relative bg-white p-8 md:p-10 rounded-3xl mt-10 shadow-2xl border border-gray-100 backdrop-blur-sm text-center transform transition-all duration-300 hover:shadow-3xl">
                        <!-- 渐变边框效果 -->
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl"></div>
                            
                        <!-- 提交成功：替代表单，挡住再次编辑 -->
                        <div v-if="submittedSuccess" class="max-w-sm mx-auto animate-fadeIn">
                            <div class="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center shadow-lg animate-bounce-once">
                                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mt-6">
                                反馈已收到！
                            </h3>
                            <p class="mt-4 text-gray-600 text-lg">我们已收到您的联系信息，会尽快与您联系。</p>
                            <p class="mt-2 text-gray-500 text-sm">如需再次提交，请刷新页面后重试。</p>
                        </div>

                        <!-- 表单 -->
                        <form v-else @submit.prevent="contact" class="max-w-sm mx-auto space-y-5">
                            <!-- 姓名输入框 -->
                            <div class="relative group">
                                <input 
                                    v-model="formData.name"
                                    type="text" 
                                    placeholder="公司 / 姓名"
                                    class="w-full p-4 pl-12 text-gray-800 rounded-xl border-2 border-gray-200 
                                           focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                                           transition-all duration-300 outline-none
                                           hover:border-gray-300" 
                                />
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </div>

                            <!-- 产品类型：下拉框 -->
                            <div class="relative group">
                                <select
                                    v-model="formData.subject"
                                    class="w-full p-4 pl-12 text-gray-800 rounded-xl border-2 border-gray-200 
                                           focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                                           transition-all duration-300 outline-none appearance-none
                                           hover:border-gray-300 bg-white cursor-pointer"
                                >
                                    <option value="" disabled>请选择产品类型</option>
                                    <option value="直播专线">直播专线</option>
                                    <option value="账号运营专线">账号运营专线</option>
                                    <option value="静态IP">静态IP</option>
                                    <option value="动态IP">动态IP</option>
                                    <option value="企业组网">企业组网</option>
                                </select>
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                </svg>
                                <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </div>

                            <!-- 邮箱输入框 -->
                            <div class="relative group">
                                <input 
                                    v-model="formData.email"
                                    type="email" 
                                    placeholder="邮箱"
                                    class="w-full p-4 pl-12 text-gray-800 rounded-xl border-2 border-gray-200 
                                           focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                                           transition-all duration-300 outline-none
                                           hover:border-gray-300" 
                                />
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>

                            <!-- 电话输入框 -->
                            <div class="relative group">
                                <input 
                                    v-model="formData.phone"
                                    type="tel" 
                                    placeholder="电话"
                                    class="w-full p-4 pl-12 text-gray-800 rounded-xl border-2 border-gray-200 
                                           focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                                           transition-all duration-300 outline-none
                                           hover:border-gray-300" 
                                />
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                            </div>

                            <!-- 留言文本框 -->
                            <div class="relative group">
                                <textarea 
                                    v-model="formData.message"
                                    placeholder="留言"
                                    rows="4"
                                    class="w-full p-4 pl-12 pt-4 text-gray-800 rounded-xl border-2 border-gray-200 
                                           focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                                           transition-all duration-300 outline-none resize-none
                                           hover:border-gray-300"
                                ></textarea>
                                <svg class="absolute left-4 top-5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                                </svg>
                            </div>

                            <!-- 提交按钮 -->
                            <button 
                                type="submit" 
                                class="w-full bg-gradient-to-r from-blue-600 to-blue-400 
                                       px-8 py-4 rounded-xl text-white font-semibold text-lg
                                       hover:from-blue-700 hover:to-blue-600
                                       transform hover:scale-105 hover:shadow-2xl
                                       transition-all duration-300
                                       disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                                       focus:ring-4 focus:ring-blue-300 outline-none
                                       relative overflow-hidden group"
                                :disabled="isSubmitting"
                            >
                                <span class="relative z-10 flex items-center justify-center gap-2">
                                    <span>{{ isSubmitting ? '提交中...' : '提交' }}</span>
                                    <svg v-if="!isSubmitting" class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                    </svg>
                                    <svg v-else class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                </span>
                                <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            </button>
                        </form>
                    </div>
                </div>
                <div class="space-y-6">
                    <!-- 联系信息卡片 -->
                    <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0">
                                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-lg font-bold text-gray-800 mb-3">跨境 SDWAN 专线咨询</h4>
                                <div class="space-y-2">
                                    <div class="flex items-start text-gray-600 hover:text-blue-600 transition-colors group">
                                        <svg class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <span class="text-sm leading-relaxed">上海市宝山区沪太路2388号201室A区</span>
                                    </div>
                                    <div class="flex items-center text-gray-600 hover:text-blue-600 transition-colors group cursor-pointer">
                                        <svg class="w-5 h-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                        <span class="text-sm">ShCloudCircle@outlook.com</span>
                                    </div>
                                    <div class="flex items-center text-gray-600 hover:text-blue-600 transition-colors group cursor-pointer">
                                        <div class="w-5 h-5 mr-3 flex items-center justify-center flex-shrink-0">
                                            <img class="w-5 h-5 group-hover:scale-110 transition-transform" src="@/assets/img/contact-phone24h.png" alt="">
                                        </div>
                                        <span class="text-sm font-medium">17721027343</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div>
                        <h4 class="text-xl font-semibold text-gray-800">境外静态 IP 咨询</h4>
                        <div class="flex items-center mt-3 text-gray-600">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            上海市浦东新区世纪大道88号
                        </div>
                        <div class="flex items-center mt-2 text-gray-600">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                            staticip@ipnexo.com
                        </div>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-gray-800">境外动态 IP 咨询</h4>
                        <div class="flex items-center mt-3 text-gray-600">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            深圳市南山区科技园南区
                        </div>
                        <div class="flex items-center mt-2 text-gray-600">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                            dynamicip@ipnexo.com
                        </div>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-gray-800">一般咨询</h4>
                        <div class="flex items-center mt-3 text-gray-600">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            东京都千代田区大手町1-1-1
                        </div>
                        <div class="flex items-center mt-2 text-gray-600">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                            info@ipnexo.com
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import http from '@/utils/http'
import API_BASE_URL from '@/config/api'

const formData = reactive({
  name: '',
  subject: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const submittedSuccess = ref(false) // 新增：提交成功标记

const contact = async () => {
  if (!formData.name || !formData.email || !formData.phone) {
    ElMessage.error('请填写必要的联系信息')
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    ElMessage.error('请输入有效的邮箱地址')
    return
  }

  try {
    isSubmitting.value = true
    // http 已在拦截器中返回 res.data，这里拿到的是后端的 data 对象
    const res = await http.post(`${API_BASE_URL}/api/contact/`, formData)

    // 兼容两种常见返回：{ status: 'success' } 或 { success: true }
    const ok = res?.status === 'success' || res?.success === true
    if (ok) {
      ElMessage.success('提交成功！我们会尽快与您联系')
      // 不再重置表单，直接切换成功态，遮挡原表单，刷新前不可再次编辑
      submittedSuccess.value = true
    } else {
      // 若后端无明确标志，但接口无异常也可视为成功（按需开启）
      // submittedSuccess.value = true
      ElMessage.error(res?.message || '提交失败，请稍后重试')
    }
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error(error?.response?.data?.message || '提交失败，请稍后重试')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* 背景动画 */
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -50px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(50px, 50px) scale(1.05);
  }
}

.animate-blob {
  animation: blob 20s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}

/* 单次弹跳动画 */
@keyframes bounce-once {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce-once {
  animation: bounce-once 0.6s ease-out;
}

/* 增强阴影 */
.shadow-3xl {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}

/* 自定义滚动条样式（针对 textarea） */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>