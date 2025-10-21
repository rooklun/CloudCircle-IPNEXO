<template>
  <!-- 移动端遮罩 -->
  <transition name="fade">
    <div
      v-if="mobileOpen"
      class="fixed inset-0 bg-black/40 z-40 md:hidden"
      @click="closeMobile()"
      aria-hidden="true"
    >
    </div>
  </transition>

  <!-- 移动端抽屉 -->
  <transition name="slide-left">
    <aside
      v-if="mobileOpen"
      class="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      <div class="h-16 px-4 border-b border-gray-200 flex items-center justify-between">
        <span class="text-base font-semibold text-gray-900">导航</span>
        <button
          class="w-9 h-9 inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          aria-label="关闭侧边栏"
          @click="closeMobile()"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="1.5" d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        <!-- 按既有顺序渲染你的菜单 -->
        <div v-for="item in navigation" :key="item.name" class="relative">
          <router-link
            v-if="!item.children"
            :to="item.href"
            :class="[
              isItemActive(item) ? 'bg-neutral-900 text-white shadow-sm' : 'bg-white text-black hover:bg-gray-100',
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all'
            ]"
            @click="closeMobile()"
          >
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
          </router-link>

          <div v-else>
            <button
              @click="toggleMenu(item)"
              :class="[
                'bg-white text-black hover:bg-gray-100',
                'group w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all'
              ]"
            >
              <component :is="item.icon" class="h-5 w-5 mr-3" />
              {{ item.name }}
              <svg class="ml-auto h-5 w-5 transition-transform" :class="{ 'rotate-180': isParentExpanded(item) }" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd" />
              </svg>
            </button>
            <div v-show="isParentExpanded(item)" class="pl-10 mt-1 space-y-1">
              <router-link
                v-for="child in item.children"
                :key="child.name"
                :to="child.href"
                :class="[
                  $route.path === child.href ? 'bg-neutral-900 text-white shadow-sm' : 'bg-white text-black hover:bg-gray-100',
                  'block px-3 py-2 text-sm rounded-md transition-colors'
                ]"
                @click="closeMobile()"
              >
                {{ child.name }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- 移动端：帮助区块（secondaryNavigation） -->
        <div class="pt-4 mt-2 border-t border-gray-200">
          <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">帮助与支持</h3>
          <div class="mt-2 space-y-2">
            <a
              v-for="item in helpNavigation"
              :key="item.name"
              :href="item.href"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white text-black hover:bg-gray-100 transition-all"
              @click="closeMobile()"
            >
              <component :is="item.icon" class="h-5 w-5 mr-3" />
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- 移动端：更多区块（secondaryNavigation） -->
        <div class="pt-4 mt-2 border-t border-gray-200">
          <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">更多</h3>
          <div class="mt-2 space-y-2">
            <a
              v-for="item in secondaryNavigation"
              :key="item.name"
              :href="item.href"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white text-black hover:bg-gray-100 transition-all"
              @click="closeMobile()"
            >
              <component :is="item.icon" class="h-5 w-5 mr-3" />
              {{ item.name }}
            </a>
          </div>
        </div>
      </nav>
    </aside>
  </transition>

  <!-- 桌面端固定侧边栏 -->
  <aside class="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
    <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-2">
      <div v-for="item in navigation" :key="item.name" class="relative">
        <router-link
          v-if="!item.children"
          :to="item.href"
          :class="[
            isItemActive(item) ? 'bg-neutral-900 text-white shadow-sm' : 'bg-white text-black hover:bg-gray-100',
            'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all'
          ]"
        >
          <component :is="item.icon" class="h-5 w-5 mr-3" />
          {{ item.name }}
        </router-link>

        <div v-else>
          <div
            @click="toggleMenu(item)"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all cursor-pointer bg-white text-black hover:bg-gray-100"
          >
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
            <svg class="ml-auto h-5 w-5 transition-transform" :class="{ 'rotate-180': isParentExpanded(item) }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd" />
            </svg>
          </div>
          <div v-show="isParentExpanded(item)" class="pl-10 mt-1 space-y-1">
            <router-link
              v-for="child in item.children"
              :key="child.name"
              :to="child.href"
              :class="[
                $route.path === child.href ? 'bg-neutral-900 text-white shadow-sm' : 'bg-white text-black hover:bg-gray-100',
                'block px-3 py-2 text-sm rounded-md transition-colors'
              ]"
            >
              {{ child.name }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- 桌面端：帮助区块（helpNavigation） -->
      <div class="pt-6 mt-2 border-t border-gray-200">
        <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">帮助与支持</h3>
        <div class="mt-2 space-y-2">
          <a
            v-for="item in helpNavigation"
            :key="item.name"
            :href="item.href"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white text-black hover:bg-gray-100 transition-all"
          >
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
          </a>
        </div>
      </div>

      <!-- 桌面端：更多区块（secondaryNavigation） -->
      <div class="pt-6 mt-2 border-t border-gray-200">
        <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">更多</h3>
        <div class="mt-2 space-y-2">
          <a
            v-for="item in secondaryNavigation"
            :key="item.name"
            :href="item.href"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white text-black hover:bg-gray-100 transition-all"
          >
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
          </a>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChartBarIcon, HomeIcon, ComputerDesktopIcon,
  WifiIcon, CurrencyYenIcon, QuestionMarkCircleIcon,
  DocumentTextIcon, Cog6ToothIcon, DocumentChartBarIcon, UsersIcon, ChevronDownIcon, UserIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  mobileOpen: { type: Boolean, default: false }
})
const emit = defineEmits(['closeMobile'])

const route = useRoute()

const navigation = ref([
  { name: '概览', href: '/user', icon: ChartBarIcon },
  {
    name: '直播/运营商专线',
    icon: ComputerDesktopIcon,
    isOpen: false,
    children: [
      { name: '购买专线', href: '/user/buy-line' },
      { name: '管理专线', href: '/user/manage-line' }
    ]
  },
  {
    name: '动态住宅',
    icon: ComputerDesktopIcon,
    isOpen: false,
    children: [
      { name: '购买流量', href: '/user/buy-traffic' },
      { name: '提取流量', href: '/user/manage-traffic' }
    ]
  },
  {
    name: '静态住宅',
    icon: HomeIcon,
    isOpen: false,
    children: [
      { name: '购买IP', href: '/user/buy-ip' },
      { name: '管理IP', href: '/user/manage-ip' }
    ]
  },
  { name: '实名认证', href: '/user/kyc', icon: UserIcon }
]);

const helpNavigation = ref([
  { name: '帮助中心', href: '/user/help-center', icon: QuestionMarkCircleIcon },
  { name: 'DEMO文档', href: '/user/demodocs', icon: DocumentTextIcon }
])

const secondaryNavigation = ref([
  { name: '账号设置', href: '/user/account-settings', icon: Cog6ToothIcon },
  { name: '订单管理', href: '/user/orders', icon: DocumentChartBarIcon },
  { name: '推广合作', href: '/user/affiliate', icon: UsersIcon },
]);

// 仅普通项参与选中高亮（父级不高亮）
const isItemActive = (item) => {
  if (!item.children) {
    return item.href && item.href !== '#' && item.href === route.path;
  }
  return false;
};

const isParentExpanded = (item) => {
  if (!item.children) return false;
  return item.isOpen || item.children.some(child => child.href === route.path);
};

const toggleMenu = (item) => {
  navigation.value = navigation.value.map(nav => {
    if (nav === item) return { ...nav, isOpen: !nav.isOpen };
    return nav;
  });
};

const updateOpenByRoute = () => {
  navigation.value = navigation.value.map(nav => {
    if (nav.children) return { ...nav, isOpen: nav.children.some(c => c.href === route.path) };
    return nav;
  });
};

onMounted(updateOpenByRoute);
watch(() => route.path, updateOpenByRoute);

// 处理移动端滚动锁定
const lockScroll = () => document.documentElement.classList.add('overflow-hidden')
const unlockScroll = () => document.documentElement.classList.remove('overflow-hidden')
watch(() => props.mobileOpen, v => v ? lockScroll() : unlockScroll())
onBeforeUnmount(unlockScroll)

const closeMobile = () => emit('closeMobile')
</script>

<style scoped>
/* 过渡动画 */
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-left-enter-active, .slide-left-leave-active {
  transition: transform .25s ease;
}
.slide-left-enter-from, .slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
