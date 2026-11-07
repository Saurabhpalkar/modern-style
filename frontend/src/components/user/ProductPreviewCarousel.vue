<template>
  <section v-reveal class="container product-preview">
    <div class="section-head">
      <div>
        <p class="eyebrow">Take a closer look</p>
        <h2 class="heading heading-lg">More to explore</h2>
        <p class="intro">Browse everyday pieces from each department, then tap a style to see the details.</p>
      </div>
      <router-link to="/shop" class="link-arrow">Shop all styles <span aria-hidden="true">→</span></router-link>
    </div>

    <div class="browse-tools">
      <div class="category-tabs" role="group" aria-label="Filter preview products by department">
        <button
          v-for="name in collectionCategories"
          :key="name"
          type="button"
          :class="{ active: selectedCategory === name }"
          :aria-pressed="selectedCategory === name"
          @click="selectCategory(name)"
        >
          {{ name }}
        </button>
      </div>
      <div class="arrows">
        <button type="button" aria-label="Scroll products left" :disabled="!canScrollLeft" @click="scrollProducts(-1)">←</button>
        <button type="button" aria-label="Scroll products right" :disabled="!canScrollRight" @click="scrollProducts(1)">→</button>
      </div>
    </div>

    <div
      ref="track"
      class="product-track"
      tabindex="0"
      aria-label="Product previews. Use the arrow buttons or horizontal scrolling to browse."
      @scroll.passive="updateScrollButtons"
    >
      <ProductCard
        v-for="(product, index) in visibleProducts"
        :key="product.id"
        v-reveal
        :product="product"
        :style="{ transitionDelay: `${Math.min(index, 5) * 55}ms` }"
      />
    </div>
    <p class="preview-count">{{ visibleProducts.length }} styles to discover</p>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { categories } from '../../data/site'
import { products } from '../../data/products'
import ProductCard from '../common/ProductCard.vue'

const collectionCategories = ['All', ...categories.slice(1)]
const selectedCategory = ref('All')
const track = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const visibleProducts = computed(() => products.filter((product) => (
  !product.bestseller
  && (selectedCategory.value === 'All' || product.category === selectedCategory.value)
)))

function updateScrollButtons() {
  const element = track.value
  if (!element) return
  canScrollLeft.value = element.scrollLeft > 2
  canScrollRight.value = element.scrollLeft + element.clientWidth < element.scrollWidth - 2
}

function scrollProducts(direction) {
  const element = track.value
  if (!element) return
  element.scrollBy({ left: direction * element.clientWidth * 0.82, behavior: 'smooth' })
}

async function selectCategory(name) {
  selectedCategory.value = name
  await nextTick()
  track.value?.scrollTo({ left: 0, behavior: 'smooth' })
  updateScrollButtons()
}

watch(visibleProducts, async () => {
  await nextTick()
  updateScrollButtons()
})

onMounted(() => {
  updateScrollButtons()
  window.addEventListener('resize', updateScrollButtons)
})

onUnmounted(() => window.removeEventListener('resize', updateScrollButtons))
</script>

<style scoped>
.product-preview { padding-top: 30px; padding-bottom: 88px; }
.section-head { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 28px; }
.eyebrow { margin-bottom: 9px; color: var(--accent); }
.intro { max-width: 470px; margin-top: 10px; color: var(--muted); font-size: 12px; }
.link-arrow { flex-shrink: 0; margin-bottom: 7px; font-size: 9px; }
.browse-tools { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 18px; }
.category-tabs { display: flex; flex-wrap: wrap; gap: 7px; }
.category-tabs button { padding: 8px 12px; border: 1px solid var(--line); background: #fff; color: var(--muted); font-family: inherit; font-size: 9px; letter-spacing: .06em; transition: background .2s, color .2s, border-color .2s, transform .2s; }
.category-tabs button:hover { transform: translateY(-2px); border-color: var(--accent); color: var(--text); }
.category-tabs button.active { border-color: var(--dark); background: var(--dark); color: #fff; }
.arrows { display: flex; flex-shrink: 0; gap: 7px; }
.arrows button { width: 36px; height: 36px; border: 1px solid var(--line); border-radius: 50%; background: #fff; color: var(--text); font-size: 14px; transition: border-color .2s, background .2s, color .2s; }
.arrows button:not(:disabled):hover { border-color: var(--dark); background: var(--dark); color: #fff; }
.arrows button:disabled { cursor: default; opacity: .38; }
.product-track { display: flex; gap: 20px; overflow-x: auto; padding: 0 1px 14px; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: var(--accent) var(--line); }
.product-track :deep(.card) { flex: 0 0 calc((100% - 60px) / 4); min-width: 0; scroll-snap-align: start; }
.preview-count { margin-top: 8px; color: var(--muted); font-size: 9px; letter-spacing: .1em; text-align: right; text-transform: uppercase; }
@media (max-width: 900px) {
  .product-preview { padding-bottom: 64px; }
  .product-track :deep(.card) { flex-basis: calc((100% - 40px) / 3); }
}
@media (max-width: 600px) {
  .product-preview { padding-top: 16px; padding-bottom: 56px; }
  .section-head { align-items: flex-start; flex-direction: column; gap: 13px; margin-bottom: 22px; }
  .browse-tools { align-items: flex-start; }
  .category-tabs { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 5px; }
  .category-tabs button { flex-shrink: 0; }
  .arrows { display: none; }
  .product-track { gap: 12px; margin-right: -20px; padding-right: 20px; }
  .product-track :deep(.card) { flex-basis: 68%; }
}
@media (prefers-reduced-motion: reduce) {
  .product-track { scroll-behavior: auto; }
}
</style>
