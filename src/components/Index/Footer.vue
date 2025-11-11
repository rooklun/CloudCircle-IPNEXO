<template>
    <footer class="bg-neutral-950 text-gray-400">
        <div class="container mx-auto px-6 py-16">

            <div class="border-b border-gray-700 pb-10 mb-10">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div>
                        <h5 class="font-bold text-white">主页</h5>
                        <ul class="mt-4 space-y-3">
                            <li><a href="#" class="hover:text-white">跨境SD-WAN专线</a></li>
                            <li><a href="#" class="hover:text-white">海外静态IP</a></li>
                            <li><a href="#" class="hover:text-white">海外动态IP</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="font-bold text-white">关于我们</h5>
                        <ul class="mt-4 space-y-3">
                            <li><a href="#" class="hover:text-white">公司简介</a></li>
                            <!-- <li><a href="#" class="hover:text-white">团队成员</a></li> -->
                        </ul>
                    </div>
                    <!-- <div>
                        <h5 class="font-bold text-white">价格列表</h5>
                    </div> -->
                    <div>
                        <!-- Spacer -->
                    </div>
                    <div class="flex justify-end items-start">
                        <a href="#" class="border border-gray-600 rounded-full p-3 hover:border-white hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div class="flex items-center space-x-2">
                    <svg class="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657-3.47 3-7.5 3s-7.5-1.343-7.5-3" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 12h.01" />
                    </svg>
                    <div>
                        <p class="font-bold text-lg text-white">IPNEXO</p>
                        <p><a href="https://beian.miit.gov.cn/#/Integrated/index">沪ICP备2025146986号-1</a></p>
                        <a href="mailto:info@ipnexo.com" class="text-sm hover:text-white">ShCloudCircle@outlook.com</a>
                        
                    </div>
                </div>
                <div class="mt-6 md:mt-0 text-center">
                    <!-- <p class="text-xs"><a href="#" class="hover:text-white">服务条款</a></p>
                    <p class="text-xs"><a href="#" class="hover:text-white">隐私政策</a></p> -->
                    <p class="text-sm">版权所有 © 2025 IPNEXO. 版权所有。</p>
                    
                    
                    
                </div>
                <div class="mt-6 md:mt-0 flex flex-col space-y-4 text-sm">

                    <a href="http://www.beian.gov.cn/portal/registerSystemInfo" rel="noreferrer" target="_blank"
                        class="flex items-center space-x-2">

                        <img src="@/assets/img/gonganwangbei.png" alt="" class="w-5 h-5">
                        <span>沪公网安备31011202021514号</span>
                    </a>

                    

                </div>
            </div>

        </div>
    </footer>
</template>