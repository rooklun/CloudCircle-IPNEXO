// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/components/DefaultLayout.vue";
import { useAuthStore } from "@/stores/auth.ts"; // 需要创建这个 store

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/pages/Home.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/Login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/pages/Register.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import('../pages/User/User.vue'),
    children: [
      {
        path: "",
        name: "UserDashboard",
        component: () => import("@/components/User/MainContent.vue"),
      },
      {
        path: "buy-ip",
        name: "BuyIP",
        component: () => import("@/components/User/BuyIP.vue"),
      },
      {
        path: "manage-ip",
        name: "ManageIP",
        component: () => import("@/components/User/ManageIP.vue"),
      },
      {
        path: "buy-line",
        name: "BuyLine",
        component: () => import("@/components/User/BuyLine.vue"),
      },
      {
        path: "manage-line",
        name: "ManageLine",
        component: () => import("@/components/User/ManageLine.vue"),
      },
      {
        path: "buy-traffic",
        name: "BuyTraffic",
        component: () => import("@/components/User/BuyTraffic.vue"),
      },
      {
        path: "manage-traffic",
        name: "ManageTraffic",
        component: () => import("@/components/User/ManageTraffic.vue"),
      },
      {
        path: "kyc",
        name: "kyc",
        component: () => import("@/components/User/KYC.vue"),
      },
      {
        path: "account-settings",
        name: "AccountSettings",
        component: () => import("@/components/User/AccountSettings.vue"),
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import("@/components/User/Orders.vue"),
      },
      {
        path: "affiliate",
        name: "Affiliate",
        component: () => import("@/components/User/Affiliate.vue"),
      },
      {
        path: "help-center",
        name: "HelpCenter",
        component: () => import("@/components/User/HelpCenter.vue"),
      },
      {
        path: "demodocs",
        name: "DemoDocs",
        component: () => import("@/components/User/DemoDocs.vue"),
      }
    ],
    meta: {
      requiresAuth: true, // 添加需要认证的标记
    },
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // history 模式
  routes,
});

// 全局路由守卫
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // 需要认证但未登录，重定向到登录页
    next({
      path: "/login",
      query: { redirect: to.fullPath }, // 保存原目标路径
    });
  } else {
    next();
  }
});

// 导出路由实例
export default router;
