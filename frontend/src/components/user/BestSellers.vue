<!-- 2 x 2 grid of best selling products -->
<template>
  <section v-reveal class="container best">
    <div class="head">
      <div>
        <p class="eyebrow">Selected for you</p>
        <h2 class="heading heading-lg">Everyday favourites</h2>
      </div>
      <router-link to="/shop" class="link-arrow">Shop all styles <span aria-hidden="true">→</span></router-link>
    </div>
    <div class="grid">
      <ProductCard v-for="(p, index) in bestSellers" :key="p.id" v-reveal :product="p" :style="{ transitionDelay: `${index * 80}ms` }" />
    </div>
  </section>
</template>

<script setup>
import { products } from '../../data/products'
import ProductCard from '../common/ProductCard.vue'

const bestSellers = products.filter((p) => p.bestseller).slice(0, 4)
</script>

<style scoped>
.best { padding-top: 32px; padding-bottom: 90px; }
.head { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 32px; }
.head .eyebrow { margin-bottom: 9px; color: var(--accent); }
.head .link-arrow { flex-shrink: 0; margin-bottom: 7px; font-size: 9px; }
.grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px; }
@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 16px; } }
@media (max-width: 600px) {
  .best { padding-top: 22px; padding-bottom: 58px; }
  .head { align-items: flex-start; flex-direction: column; gap: 12px; }
  .grid { gap: 24px 12px; }
}
</style>
