<template>
    <section id="ContactForm" class="bg-gray-50 py-20 md:py-28">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800">联系 IPNEXO</h2>
                    <p class="mt-4 text-gray-600">
                        我们随时准备好响应您的网络需求，并为您提供专业的解决方案。请联系我们，共同开启高效、稳定的全球网络之旅。
                    </p>
                    <div class="bg-white p-8 rounded-2xl mt-8 shadow-sm text-center">
                        <!-- <div class="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div> -->
                        <!-- <h3 class="text-xl font-semibold text-gray-800 mt-4">反馈已收到！🎉</h3> -->
                        <form @submit.prevent="contact" class="max-w-sm mx-auto">
                            <input 
                                v-model="formData.name"
                                type="text" 
                                placeholder="公司 / 姓名"
                                class="p-3 text-gray-800 rounded-md border mb-4 w-full" 
                            />
                            <input 
                                v-model="formData.subject"
                                type="tel" 
                                placeholder="产品类型"
                                class="p-3 text-gray-800 rounded-md border mb-4 w-full"
                                value="SDWAN跨境专线" 
                            />
                            <input 
                                v-model="formData.email"
                                type="email" 
                                placeholder="邮箱"
                                class="p-3 text-gray-800 rounded-md border mb-4 w-full" 
                            />
                            <input 
                                v-model="formData.phone"
                                type="tel" 
                                placeholder="电话"
                                class="p-3 text-gray-800 rounded-md border mb-4 w-full" 
                            />
                            <textarea 
                                v-model="formData.message"
                                placeholder="留言"
                                class="p-3 rounded-md text-gray-800 border mb-4 w-full"
                            ></textarea>
                            <button 
                                type="submit" 
                                class="bg-blue-500 px-6 py-3 rounded-lg text-white hover:bg-blue-600 transition-colors"
                                :disabled="isSubmitting"
                            >
                                {{ isSubmitting ? '提交中...' : '提交' }}
                            </button>
                        </form>
                    </div>
                </div>
                <div class="space-y-10">
                    <div>
                        <h4 class="text-xl font-semibold text-gray-800">跨境 SDWAN 专线咨询</h4>
                        <div class="flex items-center mt-3 text-gray-600">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            上海市宝山区沪太路2388号201室A区
                        </div>
                        <div class="flex items-center mt-2 text-gray-600">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                            ShCloudCircle@outlook.com
                        </div>
                        <div class="flex items-center mt-2 text-gray-600">
                            <img class="w-5 h-5 mr-3" src="@/assets/img/contact-phone24h.png" alt="">
                            17721027343
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

const contact = async () => {
    // 表单验证
    if (!formData.name || !formData.email || !formData.phone) {
        ElMessage.error('请填写必要的联系信息')
        return
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
        ElMessage.error('请输入有效的邮箱地址')
        return
    }

    try {
        isSubmitting.value = true
        const res = await http.post(`${API_BASE_URL}/api/contact/`, formData)
        console.log('提交成功:', res)
        if (res.status === 'success') {
            ElMessage.success('提交成功！我们会尽快与您联系')
            // 重置表单
            console.log('提交成功清空表单')
            Object.keys(formData).forEach(key => formData[key] = '')
        }
    } catch (error) {
        console.error('提交失败:', error)
        ElMessage.error(error.response?.data?.message || '提交失败，请稍后重试')
    } finally {
        isSubmitting.value = false
    }
}
</script>