<template>
  <main class="container mx-auto px-6 lg:px-12 py-12">
    <Hero />
    <Services />
    <Features />
    <ContactForm />
  </main>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
import Services from "@/components/Services.vue";
import Features from "@/components/Features.vue";
import ContactForm from "@/components/ContactForm.vue";
import Footer from "@/components/Footer.vue";
import Logo from "@/components/Logo.vue";
</script>
<!-- 
<template>
    <h1>路由测试</h1>
</template> -->