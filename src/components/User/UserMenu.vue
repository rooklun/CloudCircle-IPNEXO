<template>
    <div class="flex items-center space-x-4">
        <div class="recharge-wrap">
            <button class="recharge-btn" type="button">
                <span class="btn-text">充值</span>
            </button>
        </div>

        <div class="relative">
            <div
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
                class="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 border border-gray-200 shadow-sm"
            >
                <img class="h-5 w-5" src="@/assets/img/user-user.png" alt="用户">
            </div>

            <!-- 用户菜单（浅色主题） -->
            <div
                v-show="isUserMenuOpen"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
                class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50"
            >
                <div class="px-4 py-3 border-b border-gray-100">
                    <p class="text-sm font-medium text-gray-900">{{ authStore.user?.username || '未登录' }}</p>
                    <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                </div>

                <router-link
                    to="/user/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    个人资料
                </router-link>

                <router-link
                    to="/user/change-password"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    修改密码
                </router-link>

                <button
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
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

<style scoped>
.recharge-wrap {
    position: relative;
    display: inline-block;
    isolation: isolate;
}

/* 黑色胶囊主体 */
.recharge-btn {
    position: relative;
    background: #0b0d10;
    color: #fff;
    padding: 10px 22px;
    border-radius: 9999px;
    font-weight: 600;
    line-height: 1;
    border: 2px solid transparent;
    background-clip: padding-box;
    box-shadow: 0 8px 20px rgba(0, 0, 0, .12);
    transition: transform .15s ease;
}

.recharge-btn:hover {
    transform: translateY(-1px);
}

.btn-text {
    position: relative;
    z-index: 1;
}

/* 流动彩虹边框 - 使用线性渐变沿边缘流动 */
.recharge-btn::before {
    content: "";
    position: absolute;
    inset: -2px;
    /* 覆盖边框区域 */
    padding: 2px;
    border-radius: inherit;
    background: linear-gradient(90deg,
            #ff3cac 0%,
            #784ba0 16.67%,
            #2b86c5 33.33%,
            #23a6d5 50%,
            #23d5ab 66.67%,
            #f7b42c 83.33%,
            #ff3cac 100%);
    background-size: 300% 100%;
    /* 拉长背景以实现流动效果 */
    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    ;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
    animation: border-flow 3s linear infinite;
}

/* 底部光晕 - 同样使用 background-position 流动 */
.recharge-btn::after {
    content: "";
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: -8px;
    height: 14px;
    border-radius: 9999px;
    filter: blur(12px);
    opacity: .9;
    z-index: -2;
    background: linear-gradient(90deg,
            #ff3cac 0%,
            #784ba0 16.67%,
            #2b86c5 33.33%,
            #23a6d5 50%,
            #23d5ab 66.67%,
            #f7b42c 83.33%,
            #ff3cac 100%);
    background-size: 300% 100%;
    animation: border-flow 3s linear infinite;
    pointer-events: none;
}

@keyframes border-flow {
    0% {
        background-position: 0% 0%;
    }

    100% {
        background-position: 300% 0%;
        /* 向右流动 */
    }
}

@media (prefers-reduced-motion: reduce) {

    .recharge-btn::before,
    .recharge-btn::after {
        animation: none;
    }
}
</style>