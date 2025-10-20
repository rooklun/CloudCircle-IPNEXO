<template>
  <aside class="w-70 bg-white border-gray-200 flex-shrink-0 flex flex-col">
    <nav class="flex-1 px-4 py-6 space-y-2">
      <!-- 常规菜单项（无子菜单） -->
      <div v-for="item in navigation" :key="item.name" class="relative">
        <!-- 无子菜单 -->
        <router-link v-if="!item.children" :to="item.href" :class="[
          isItemActive(item)
            ? 'bg-neutral-900 text-white shadow-sm'
            : 'bg-white text-black hover:bg-gray-100',
          'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap'
        ]">
          <component :is="item.icon" class="h-5 w-5 mr-3" />
          {{ item.name }}
          <span v-if="item.tag" :class="`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${item.tagClass}`">
            {{ item.tag }}
          </span>
        </router-link>

        <!-- 有子菜单 -->
        <div v-else>
          <div @click="toggleMenu(item)"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap cursor-pointer bg-white text-black hover:bg-gray-100">
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
            <ChevronDownIcon class="ml-auto h-5 w-5 transform transition-transform duration-200""
            />
          </div>

          <div v-show="isParentExpanded(item)" class="pl-10 mt-1 space-y-1">
              <router-link v-for="child in item.children" :key="child.name" :to="child.href" :class="[
                $route.path === child.href
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-white text-black hover:bg-gray-100',
                'block px-3 py-2 text-sm rounded-md transition-colors'
              ]">
                {{ child.name }}
              </router-link>
          </div>
        </div>
      </div>

      <!-- 更多 -->
      <div class="pt-6">
        <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">更多</h3>
        <div class="mt-2 space-y-2">
          <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white text-black hover:bg-gray-100 transition-all duration-200">
            <component :is="item.icon" class="h-5 w-5 mr-3" />
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

  { name: '直播/运营商专线', href: '#', icon: ComputerDesktopIcon, tag: '特别推荐', tagClass: 'bg-red-500/80 text-white' },
  { name: '动态住宅', href: '#', icon: WifiIcon, tag: '免费测试', tagClass: 'bg-green-500/80 text-white' },
  {
    name: '静态住宅',
    icon: HomeIcon,
    isOpen: false,
    children: [
      { name: '购买IP', href: '/user/buy-ip' },
      { name: '管理IP', href: '/user/manage-ip' }
    ]
  },
  { name: '帮助支持', href: '#', icon: CurrencyYenIcon },
  { name: '帮助中心', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'DEMO文档', href: '#', icon: DocumentTextIcon },
]);

const secondaryNavigation = ref([
  { name: '账号设置', href: '#', icon: Cog6ToothIcon },
  { name: '订单管理', href: '#', icon: DocumentChartBarIcon },
  { name: '推广合作', href: '#', icon: UsersIcon },
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
</script>
