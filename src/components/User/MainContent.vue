<template>
  <div class="space-y-6">
    <section class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-gray-900">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">概览</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          class="bg-white border border-black rounded-lg shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-300">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">全球直播代理</h2>
          <div class="flex justify-around items-center text-center">
            <div>
              <p class="text-sm text-gray-600">精品独享</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">
                <sup>¥</sup>158
                <span class="text-base font-normal text-gray-500">/月</span>
              </p>
            </div>
            <div class="w-px h-12 bg-gray-200"></div>
            <div>
              <p class="text-sm text-gray-600">高端直播</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">
                <sup>¥</sup>558
                <span class="text-base font-normal text-gray-500">/月</span>
              </p>
            </div>
          </div>
          <!-- 按原尺寸保留 py，改用彩虹边框样式 -->
          <button class="mt-6 w-full py-2.5 rounded-md font-semibold transition-colors btn-rainbow">
            立即购买
          </button>
        </div>

        <!-- Card 2: 静态住宅 -->
        <div
          class="bg-white border border-black rounded-lg shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-300">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">静态住宅</h2>
          <p class="text-3xl font-bold text-gray-900">
            低至 <span class="text-gray-900"><sup>¥</sup>48</span>
            <span class="text-base font-normal text-gray-500">/条/月</span>
          </p>
          <button class="mt-12 w-full py-2.5 rounded-md font-semibold transition-colors btn-rainbow">
            立即购买
          </button>
        </div>

        <!-- Card 3: 动态住宅 -->
        <div
          class="bg-white border border-black rounded-lg shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-300">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">动态住宅</h2>
          <p class="text-3xl font-bold text-gray-900">
            低至 <span class="text-gray-900"><sup>¥</sup>20</span>
            <span class="text-base font-normal text-gray-500">/G</span>
          </p>
          <button class="mt-12 w-full py-2.5 rounded-md font-semibold transition-colors btn-rainbow">
            立即购买
          </button>
        </div>
      </div>
    </section>

    <!-- Placeholder Content -->
    <section class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div class="mt-24 flex flex-col items-center justify-center text-center text-gray-500">
        <div class="relative w-48 h-48 mb-6">
          <div class="absolute inset-0 bg-cyan-400/10 rounded-full animate-ping"></div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-48 w-48 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
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
        <!-- 保留原 px/py 尺寸 -->
        <button class="mt-6 px-8 py-3 text-sm font-semibold transition-all duration-200 btn-rainbow">
          立即购买
        </button>
      </div>
    </section>
  </div>
</template>
