<!-- Single product: big image, size picker, add to cart -->
<template>
  <section v-if="product" class="container product">
    <div v-reveal class="photo">
      <ProductPhoto :product="product" loading="eager" />
      <span class="photo-tag">MODERN STYLE · VIRAR EAST</span>
    </div>

    <div v-reveal class="details">
      <router-link to="/shop" class="back"><span aria-hidden="true">←</span> Back to collection</router-link>
      <p class="eyebrow">{{ product.category }} <span>·</span> EVERYDAY EDIT</p>
      <h1 class="heading heading-lg">{{ product.name }}</h1>
      <p class="price">{{ formatPrice(product.price) }} <span>INR</span></p>
      <p class="desc">{{ product.description }}</p>

      <p class="label">Select your size</p>
      <div class="sizes">
        <button v-for="s in product.sizes" :key="s" type="button" :aria-pressed="s === size" :class="{ on: s === size }" @click="size = s">{{ s }}</button>
      </div>

      <div class="buy">
        <div class="qty">
          <button type="button" aria-label="Decrease quantity" @click="qty = Math.max(1, qty - 1)">−</button>
          <span>{{ qty }}</span>
          <button type="button" aria-label="Increase quantity" @click="qty++">+</button>
        </div>
        <button class="btn add-btn" @click="add">Add to Cart <span aria-hidden="true">→</span></button>
      </div>
      <p v-if="added" class="added" role="status">Added to cart. <router-link to="/cart">View cart →</router-link></p>
      <div class="store-note">
        <span class="store-mark">MS</span>
        <p><strong>Prefer to try it on?</strong><br />Visit us in Virar East and find your fit in-store.</p>
      </div>
    </div>
  </section>
  <p v-else class="container center" style="padding: 120px 0">Product not found.</p>

  <section v-if="product" v-reveal class="container related">
    <div class="related-head">
      <div><p class="eyebrow">The collection</p><h2 class="heading heading-md">You may also like</h2></div>
      <router-link to="/shop" class="link-arrow">View all styles →</router-link>
    </div>
    <div class="grid">
      <ProductCard v-for="p in related" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct, getProducts } from '../../services/api'
import { formatPrice } from '../../data/products'
import { addToCart } from '../../store/cart'
import ProductCard from '../../components/common/ProductCard.vue'
import ProductPhoto from '../../components/common/ProductPhoto.vue'

const route = useRoute()
const product = ref(null)
const related = ref([])
const size = ref('')
const qty = ref(1)
const added = ref(false)

// Load product whenever the id in the URL changes
watch(() => route.params.id, async (id) => {
  product.value = await getProduct(id)
  size.value = product.value ? product.value.sizes[0] : ''
  qty.value = 1
  added.value = false
  const all = await getProducts()
  related.value = all.filter((p) => p.id !== Number(id)).slice(0, 4)
}, { immediate: true })

function add() {
  addToCart(product.value, size.value, qty.value)
  added.value = true
}
</script>

<style scoped>
.product { display: grid; grid-template-columns: 1.05fr .95fr; gap: clamp(36px, 7vw, 88px); padding-top: 54px; padding-bottom: 82px; align-items: center; }
.photo { position: relative; aspect-ratio: 4 / 4.7; background: var(--bg-soft); overflow: hidden; }
.photo::after { position: absolute; inset: 55% 0 0; background: linear-gradient(transparent, #11110f55); content: ''; pointer-events: none; }
.photo :deep(.product-photo) { transition: transform .8s cubic-bezier(.2,.7,.2,1); }
.photo:hover :deep(.product-photo) { transform: scale(1.035); }
.photo-tag { position: absolute; z-index: 1; bottom: 20px; left: 22px; color: #fff; font-size: 8px; letter-spacing: .17em; }
.details { padding: clamp(22px, 4vw, 48px); background: #fff; border: 1px solid var(--line); }
.back { display: inline-flex; gap: 8px; align-items: center; margin-bottom: 42px; color: var(--muted); font-size: 9px; letter-spacing: .14em; text-transform: uppercase; transition: color .2s; }
.back:hover { color: var(--accent); }
.eyebrow { margin-bottom: 12px; color: var(--accent); }
.eyebrow span { padding: 0 4px; }
.details h1 { font-size: clamp(27px, 3.2vw, 42px); }
.price { margin: 20px 0; font-family: var(--font-heading); font-size: 30px; }
.price span { color: var(--muted); font-family: var(--font-body); font-size: 8px; letter-spacing: .15em; }
.desc { max-width: 440px; margin-bottom: 30px; color: var(--muted); font-size: 13px; }
.label { margin-bottom: 11px; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; }
.sizes { display: flex; gap: 9px; margin-bottom: 28px; }
.sizes button { min-width: 46px; height: 44px; padding: 0 10px; background: transparent; border: 1px solid var(--line); font-size: 11px; transition: background .2s, color .2s, border-color .2s; }
.sizes button:hover { border-color: var(--dark); }
.sizes button.on { border-color: var(--dark); background: var(--dark); color: #fff; }
.buy { display: flex; gap: 12px; align-items: stretch; }
.qty { display: flex; align-items: center; border: 1px solid var(--line); }
.qty button { width: 38px; background: none; border: none; font-size: 17px; }
.qty span { width: 26px; text-align: center; font-size: 12px; }
.add-btn { flex: 1; display: flex; justify-content: space-between; align-items: center; text-align: left; }
.added { margin-top: 14px; color: #426348; font-size: 12px; }
.added a { text-decoration: underline; }
.store-note { display: flex; align-items: center; gap: 14px; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--line); }
.store-mark { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; flex-shrink: 0; border: 1px solid var(--accent); border-radius: 50%; color: var(--accent); font-family: var(--font-heading); font-size: 14px; }
.store-note p { color: var(--muted); font-size: 10px; line-height: 1.8; }
.store-note strong { color: var(--text); font-weight: 400; }
.related { padding-bottom: 90px; }
.related-head { display: flex; justify-content: space-between; align-items: end; gap: 18px; margin-bottom: 26px; }
.related-head .eyebrow { margin-bottom: 5px; }
.related-head .link-arrow { flex-shrink: 0; margin-bottom: 5px; font-size: 9px; }
.grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px; }
@media (max-width: 800px) {
  .product { grid-template-columns: 1fr; gap: 22px; padding-top: 24px; padding-bottom: 50px; }
  .photo { aspect-ratio: 1 / 1; }
  .details { padding: 26px 22px; }
  .back { margin-bottom: 27px; }
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 12px; }
}
</style>
