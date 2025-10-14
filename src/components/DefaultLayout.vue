<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Index/Header.vue'
import Footer from '@/components/Index/Footer.vue'
</script>