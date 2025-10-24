<template>
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
            <router-link
                to="/"
                class="flex items-center space-x-2 group cursor-pointer"
                aria-label="返回首页"
                title="返回首页"
            >
                <svg class="h-8 w-8 text-blue-600 group-hover:opacity-90 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657-3.47 3-7.5 3s-7.5-1.343-7.5-3" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 12h.01" />
                </svg>
                <span class="font-bold text-xl text-gray-800 group-hover:text-gray-900">IPNEXO</span>
            </router-link>

            <!-- 右侧按钮组：注册 / 登录 / 联系我们 -->
            <div class="flex items-center space-x-3">
                <router-link
                    to="/register"
                    class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                    注册
                </router-link>

                <router-link
                    to="/login"
                    class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                    登录
                </router-link>

                <a
                    href="#ContactForm"
                    class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2"
                >
                    <span>联系我们</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </nav>
    </header>
</template>