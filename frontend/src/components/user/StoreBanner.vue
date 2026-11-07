<!-- Wide local-store call-to-action with clothing photography -->
<template>
  <section v-reveal class="container store-section">
    <div class="banner">
      <div class="banner-art"><ProductPhoto :product="featuredProduct" /></div>
      <div class="content">
        <p class="eyebrow">Come say hello · Virar East</p>
        <h2 class="heading heading-lg">Your local store.<br />Your everyday style.</h2>
        <router-link to="/contact" class="btn">Get directions <span aria-hidden="true">↗</span></router-link>
      </div>
      <span class="corner-note">MODERN STYLE · TRY IT WEAR IT</span>
    </div>
  </section>
</template>

<script setup>
import { products } from '../../data/products'
import ProductPhoto from '../common/ProductPhoto.vue'

const featuredProduct = products[0]
</script>

<style scoped>
.store-section { padding-top: 20px; padding-bottom: 90px; }
.banner { position: relative; max-width: 1120px; min-height: 390px; margin: 0 auto; overflow: hidden; background: #19231d; display: flex; align-items: center; }
.banner-art { position: absolute; inset: 0 0 0 auto; width: 52%; overflow: hidden; transition: transform .8s; }
.banner-art :deep(.product-photo) { transition: transform .8s; object-position: center 35%; }
.banner:hover .banner-art :deep(.product-photo) { transform: scale(1.035); }
.banner::after { position: absolute; inset: 0; background: linear-gradient(90deg, #19231d 0%, #19231df2 42%, #19231d1a 100%); content: ''; pointer-events: none; }
.content { position: relative; max-width: 680px; padding: 56px; color: #fff; }
.content, .corner-note { z-index: 1; }
.content .eyebrow { color: var(--gold); margin-bottom: 14px; }
.content h2 { margin-bottom: 28px; font-size: clamp(28px, 4vw, 46px); }
.content .btn { border-color: var(--gold); background: var(--gold); color: var(--dark); }
.corner-note { position: absolute; right: 22px; bottom: 20px; color: #ffffffc7; font-size: 8px; letter-spacing: .16em; }
@media (max-width: 600px) {
  .store-section { padding-bottom: 58px; }
  .banner { min-height: 340px; }
  .banner-art { width: 72%; opacity: .8; }
  .banner::after { background: linear-gradient(90deg, #19231df7 0%, #19231dda 45%, #19231d60 100%); }
  .content { padding: 32px 24px; }
  .corner-note { right: 16px; bottom: 14px; font-size: 7px; }
}
</style>
