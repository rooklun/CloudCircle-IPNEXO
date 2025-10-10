<template>
  <div
    class="min-h-screen bg-gradient-to-r from-indigo-900 to-slate-900 text-slate-100 font-sans"
  >
    <router-view />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
import Services from "@/components/Services.vue";
import Features from "@/components/Features.vue";
import ContactForm from "@/components/ContactForm.vue";
import Footer from "@/components/Footer.vue";
</script>