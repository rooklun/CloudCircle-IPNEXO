<template>
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center space-x-2">
                 <svg class="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657-3.47 3-7.5 3s-7.5-1.343-7.5-3" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 12h.01" />
                </svg>
                <span class="font-bold text-xl text-gray-800">IPNEXO</span>
            </div>
            <!-- <div class="hidden md:flex items-center space-x-8">
                <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">主页</a>
                <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">关于我们</a>
                <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">价格列表</a>
            </div> -->
            <a href="#ContactForm" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2">
                <span>联系我们</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>
        </nav>
    </header>
</template>