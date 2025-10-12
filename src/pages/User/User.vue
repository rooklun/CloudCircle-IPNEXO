<template>
  <div class="bg-[#0A0F1C] text-gray-300 font-sans min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-70 bg-[#111827] border-r border-gray-800 flex-shrink-0 flex flex-col">
      <div class="h-16 flex items-center justify-center text-2xl font-bold text-white border-b border-gray-800">
        <span>IPNEXO</span>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[
          item.current
            ? 'bg-cyan-900/50 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap',
        ]">
          <component :is="item.icon" class="h-5 w-5 mr-3 text-gray-50" />
          {{ item.name }}
          <span v-if="item.tag" :class="`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${item.tagClass}`">{{
            item.tag }}</span>
        </a>

        <div class="pt-6">
          <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            更多
          </h3>
          <div class="mt-2 space-y-2">
            <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200">
              <component :is="item.icon" class="h-5 w-5 mr-3 text-gray-500 group-hover:text-cyan-400" />
              {{ item.name }}
            </a>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header
        class="h-16 bg-[#111827]/90 backdrop-blur-sm border-b border-gray-800 flex items-center justify-between px-8">
        <div class="flex items-center space-x-6 text-sm">
          <a href="#" class="text-gray-300 hover:text-white transition-colors">海外代理IP</a>
          <a href="#" class="text-gray-300 hover:text-white transition-colors">跨境网络专线</a>
          <a href="#" class="text-gray-300 hover:text-white transition-colors">用户教程</a>
          <a href="#" class="relative text-gray-300 hover:text-white transition-colors">
            资源中心
            <!-- <span
              class="absolute -top-2 -right-4 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full"
              >HOT</span
            > -->
          </a>
          <a href="#" class="text-gray-300 hover:text-white transition-colors">代理合作</a>
        </div>
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
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-8 overflow-y-auto">
        <h1 class="text-3xl font-bold text-white mb-6">概览</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1: 全球直播代理 -->
          <div
            class="bg-[#161B22] border border-cyan-500/30 rounded-lg shadow-lg shadow-cyan-500/5 p-6 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-xl font-semibold text-white mb-4">全球直播代理</h2>
            <div class="flex justify-around items-center text-center">
              <div>
                <p class="text-sm text-gray-400">精品独享</p>
                <p class="text-3xl font-bold text-gray-50 mt-1">
                  <sup>¥</sup>158<span class="text-base font-normal text-gray-500">/月</span>
                </p>
              </div>
              <div class="w-px h-12 bg-gray-700"></div>
              <div>
                <p class="text-sm text-gray-400">高端直播</p>
                <p class="text-3xl font-bold text-gray-50 mt-1">
                  <sup>¥</sup>558<span class="text-base font-normal text-gray-500">/月</span>
                </p>
              </div>
            </div>
            <button
              class="mt-6 w-full bg-indigo-500 text-white py-2.5 rounded-md hover:bg-indigo-600 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500">
              立即购买
            </button>
          </div>

          <!-- Card 2: 静态住宅 -->
          <div
            class="bg-[#161B22] border border-gray-800 rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-xl font-semibold text-white mb-4">静态住宅</h2>
            <p class="text-3xl font-bold text-gray-300">
              低至 <span class="text-gray-50"><sup>¥</sup>48</span><span
                class="text-base font-normal text-gray-500">/条/月</span>
            </p>
            <button
              class="mt-12 w-full bg-gray-700 text-gray-300 py-2.5 rounded-md hover:bg-gray-600 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500">
              立即购买
            </button>
          </div>

          <!-- Card 3: 动态住宅 -->
          <div
            class="bg-[#161B22] border border-gray-800 rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-xl font-semibold text-white mb-4">动态住宅</h2>
            <p class="text-3xl font-bold text-gray-300">
              低至 <span class="text-gray-50"><sup>¥</sup>20</span><span
                class="text-base font-normal text-gray-500">/G</span>
            </p>
            <button
              class="mt-12 w-full bg-gray-700 text-gray-300 py-2.5 rounded-md hover:bg-gray-600 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500">
              立即购买
            </button>
          </div>
        </div>

        <!-- Placeholder Content -->
        <div class="mt-24 flex flex-col items-center justify-center text-center text-gray-500">
          <div class="relative w-48 h-48 mb-6">
            <div class="absolute inset-0 bg-cyan-400/10 rounded-full animate-ping"></div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-48 w-48 text-gray-700" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <!-- <div
              class="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div> -->
          </div>
          <p>暂无数据, 请购买产品后, 刷新进入页面</p>
          <div class="mt-12 text-left text-sm space-y-2">
            <p class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
              一键直达，独享纯净原生IP+金融级国际专线
            </p>
            <p class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
              全终端适配, 支持数通PC、iOS
            </p>
          </div>
          <button
            class="mt-6 px-8 py-3 text-sm font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200">
            立即购买
          </button>
        </div>
      </main>
    </div>

    <!-- Floating Action Buttons -->
    <div class="fixed right-4 bottom-1/2 translate-y-1/2 flex flex-col items-center space-y-3">
      <button v-for="action in floatingActions" :key="action.name"
        class="w-12 h-12 bg-[#161B22] border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-50 hover:border-gray-50 transition-all duration-200 group relative">
        <component :is="action.icon" class="h-6 w-6" />
        <span
          class="absolute right-full mr-3 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {{ action.name }}
        </span>
      </button>
      <div class="w-8 h-px bg-gray-700 my-1"></div>
      <button
        class="w-12 h-12 bg-gray-50 border border-gray-50 rounded-full flex items-center justify-center text-gray-950 hover:bg-gray-50 transition-all duration-200 group relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
        <span
          class="absolute right-full mr-3 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          回到顶部
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, onMounted, ref } from 'vue';
import {
  ChartBarIcon,
  HomeIcon,
  ComputerDesktopIcon,
  WifiIcon,
  CurrencyYenIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline';
import Logo from '@/components/Logo.vue';
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

const navigation = shallowRef([
  { name: '概览', href: '#', icon: ChartBarIcon, current: true },
  { name: '静态住宅', href: '#', icon: HomeIcon, current: false },
  { name: '直播/运营商专线', href: '#', icon: ComputerDesktopIcon, tag: '特别推荐', tagClass: 'bg-red-500/80 text-white', current: false },
  { name: '动态住宅', href: '#', icon: WifiIcon, tag: '免费测试', tagClass: 'bg-green-500/80 text-white', current: false },
  { name: '帮助支持', href: '#', icon: CurrencyYenIcon, current: false },
  { name: '帮助中心', href: '#', icon: QuestionMarkCircleIcon, current: false },
  { name: 'DEMO文档', href: '#', icon: DocumentTextIcon, current: false },
]);

const secondaryNavigation = shallowRef([
  { name: '账号设置', href: '#', icon: Cog6ToothIcon },
  { name: '订单管理', href: '#', icon: DocumentChartBarIcon },
  { name: '推广合作', href: '#', icon: UsersIcon },
]);

const floatingActions = shallowRef([
  { name: '在线客服', icon: ChatBubbleLeftRightIcon },
  { name: '联系我们', icon: PaperAirplaneIcon },
  { name: '刷新页面', icon: ArrowPathIcon },
]);
</script>

