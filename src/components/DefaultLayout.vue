<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/NewIndex/Header.vue'
import Footer from '@/components/NewIndex/Footer.vue'
</script>