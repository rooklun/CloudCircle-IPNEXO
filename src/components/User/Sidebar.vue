<template>
  <aside class="w-70 bg-[#111827] border-r border-gray-800 flex-shrink-0 flex flex-col">
    <nav class="flex-1 px-4 py-6 space-y-2">
      <!-- 常规菜单项（无子菜单） -->
      <router-link
        v-for="item in navigation.filter(item => !item.children)"
        :key="item.name"
        :to="item.href"
        :class="[
          isItemActive(item) ? 'bg-cyan-900/50 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap'
        ]"
      >
        <component :is="item.icon" class="h-5 w-5 mr-3 text-gray-50" />
        {{ item.name }}
        <span
          v-if="item.tag"
          :class="`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${item.tagClass}`"
        >{{ item.tag }}</span>
      </router-link>

      <!-- 带子菜单的项目 -->
      <div v-for="item in navigation.filter(item => item.children)" :key="item.name" class="relative">
        <div
          @click="toggleMenu(item)"
          :class="[
            'text-gray-400 hover:bg-gray-800 hover:text-white',
            'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap cursor-pointer'
          ]"
        >
          <component :is="item.icon" class="h-5 w-5 mr-3 text-gray-50" />
          {{ item.name }}
          <ChevronDownIcon 
            class="ml-auto h-5 w-5 transform transition-transform duration-200"
          />
        </div>
        
        <!-- 子菜单 -->
        <div
          v-show="isParentExpanded(item)"
          class="pl-10 mt-1 space-y-1"
        >
          <router-link
            v-for="child in item.children"
            :key="child.name"
            :to="child.href"
            :class="[
              $route.path === child.href ? 'bg-cyan-900/40 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
              'block px-3 py-2 text-sm rounded-md transition-colors'
            ]"
          >
            {{ child.name }}
          </router-link>
        </div>
      </div>
      
      <!-- 更多 -->
      <div class="pt-6">
        <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">更多</h3>
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
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  ChartBarIcon, HomeIcon, ComputerDesktopIcon,
  WifiIcon, CurrencyYenIcon, QuestionMarkCircleIcon,
  DocumentTextIcon, Cog6ToothIcon, DocumentChartBarIcon, UsersIcon, ChevronDownIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();

const navigation = ref([
  { name: '概览', href: '/user', icon: ChartBarIcon },
  { 
    name: '静态住宅', 
    icon: HomeIcon, 
    isOpen: false,
    children: [
      { name: '购买IP', href: '/user/buy-ip' },
      { name: '管理IP', href: '/user/manage-ip' }
    ]
  },
  { name: '直播/运营商专线', href: '#', icon: ComputerDesktopIcon, tag: '特别推荐', tagClass: 'bg-red-500/80 text-white' },
  { name: '动态住宅', href: '#', icon: WifiIcon, tag: '免费测试', tagClass: 'bg-green-500/80 text-white' },
  { name: '帮助支持', href: '#', icon: CurrencyYenIcon },
  { name: '帮助中心', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'DEMO文档', href: '#', icon: DocumentTextIcon },
]);

const secondaryNavigation = ref([
  { name: '账号设置', href: '#', icon: Cog6ToothIcon },
  { name: '订单管理', href: '#', icon: DocumentChartBarIcon },
  { name: '推广合作', href: '#', icon: UsersIcon },
]);

// 判断某个菜单项是否应该被视为激活
const isItemActive = (item) => {
  // 如果是普通菜单项，直接比较路由
  if (!item.children) {
    return item.href && item.href !== '#' && item.href === route.path;
  }
  
  // 如果是带子菜单的项目，只在子项被选中时返回 true
  // 注意：这里不再让父菜单显示选中状态
  return item.children.some(child => child.href === route.path);
};

// 父菜单展开状态单独处理
const isParentExpanded = (item) => {
  if (!item.children) return false;
  return item.isOpen || item.children.some(child => child.href === route.path);
};

// 切换父菜单展开/收起（点击时）
const toggleMenu = (item) => {
  navigation.value = navigation.value.map(nav => {
    if (nav === item) {
      return { ...nav, isOpen: !nav.isOpen };
    }
    return nav;
  });
};

// 路由变化时，根据路由自动展开包含当前路由的父菜单
const updateOpenByRoute = () => {
  navigation.value = navigation.value.map(nav => {
    if (nav.children) {
      return { ...nav, isOpen: nav.children.some(c => c.href === route.path) };
    }
    return nav;
  });
};

onMounted(() => updateOpenByRoute());
watch(() => route.path, () => updateOpenByRoute());
</script>