<template>
    <div class="flex items-center space-x-4">
        <button
            class="px-5 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200">
            充值
        </button>
        <div class="relative">
            <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
                class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>

            <!-- 用户菜单 -->
            <div v-show="isUserMenuOpen" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
                class="absolute right-0 mt-2 w-48 bg-[#111827] rounded-md shadow-lg py-1 border border-gray-800 z-50">
                <!-- 用户信息部分 -->
                <div class="px-4 py-2 border-b border-gray-800">
                    <p class="text-sm text-white">{{ authStore.user?.username }}</p>
                    <p class="text-xs text-gray-400">{{ authStore.user?.email }}</p>
                </div>

                <!-- 菜单选项 -->
                <router-link to="/user/profile" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                    个人资料
                </router-link>

                <router-link to="/user/change-password" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                    修改密码
                </router-link>

                <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800">
                    退出登录
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// ...原user menu逻辑...
const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
    if (!authStore.isLoggedIn) {
        router.push('/login')
    }
})

const isUserMenuOpen = ref(false)
const closeTimeout = ref(null)

const handleMouseEnter = () => {
    if (closeTimeout.value) {
        clearTimeout(closeTimeout.value)
    }
    isUserMenuOpen.value = true
}

const handleMouseLeave = () => {
    closeTimeout.value = setTimeout(() => {
        isUserMenuOpen.value = false
    }, 300) // 300ms 的延迟，您可以根据需要调整这个值
}

const handleLogout = () => {
    authStore.logout()
    router.push('/login')
}
</script>