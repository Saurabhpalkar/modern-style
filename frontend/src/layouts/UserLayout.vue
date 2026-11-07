<!-- Layout for all customer pages: header on top, footer at bottom -->
<template>
  <SiteHeader />
  <main>
    <router-view />
  </main>
  <SiteFooter />
</template>

<script setup>
import SiteHeader from '../components/user/SiteHeader.vue'
import SiteFooter from '../components/user/SiteFooter.vue'
</script>
