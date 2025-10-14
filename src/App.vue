<template>
  <div
    class="min-h-screen bg-gradient-to-r from-indigo-900 to-slate-900 text-slate-100 font-sans"
  >
    <router-view />
  </div>
</template>

<script setup>
import Header from "@/components/Index/Header.vue";
import Hero from "@/components/Index/Hero.vue";
import Services from "@/components/Index/Services.vue";
import Features from "@/components/Index/Features.vue";
import ContactForm from "@/components/Index/ContactForm.vue";
import Footer from "@/components/Index/Footer.vue";
</script>