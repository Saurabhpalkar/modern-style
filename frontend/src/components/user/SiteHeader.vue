<template>
  <header ref="header" class="header">
    <div class="topline">
      <span class="sr-only">Free delivery on orders above ₹999. Diwali offer live now: 50% off. Visit Modern Style in Virar East.</span>
      <div class="ticker" aria-hidden="true">
        <div class="ticker-track">
          <div class="ticker-group">
            <span>FREE DELIVERY ON ORDERS ABOVE ₹999</span>
            <span><i>✦</i> DIWALI OFFER LIVE NOW · 50% OFF</span>
            <span><i>✦</i> CELEBRATE IN STYLE AT MODERN STYLE</span>
          </div>
          <div class="ticker-group">
            <span>FREE DELIVERY ON ORDERS ABOVE ₹999</span>
            <span><i>✦</i> DIWALI OFFER LIVE NOW · 50% OFF</span>
            <span><i>✦</i> CELEBRATE IN STYLE AT MODERN STYLE</span>
          </div>
        </div>
      </div>
      <router-link class="topline-visit" to="/contact" @click="closeMenus">VISIT US <span aria-hidden="true">↗</span></router-link>
    </div>
    <div class="container bar">
      <nav class="links">
        <router-link to="/shop" @click="closeMenus">Shop All</router-link>
        <details ref="categoryMenu" class="category-menu">
          <summary>Categories <span aria-hidden="true">⌄</span></summary>
          <div class="mega-menu">
            <div v-for="department in departments" :key="department.name" class="menu-group">
              <router-link to="/shop" class="group-title" @click="closeMenus">{{ department.name }}</router-link>
              <span v-for="item in department.items" :key="item">{{ item }}</span>
            </div>
            <router-link to="/shop" class="menu-cta" @click="closeMenus">Explore the collection →</router-link>
          </div>
        </details>
        <router-link to="/contact" @click="closeMenus">Contact</router-link>
      </nav>

      <router-link to="/" class="logo" aria-label="Modern Style home" @click="closeMenus">
        <img src="/images/modern-style-logo.png" alt="Modern Style Men's Wear" />
      </router-link>

      <div class="right">
        <router-link to="/cart" class="cart" @click="closeMenus">Cart ({{ cartCount }})</router-link>
        <button class="menu-btn" :aria-expanded="open" aria-controls="mobile-menu" @click="open = !open">
          <span>Menu</span>
          <span class="burger"><i></i><i></i></span>
        </button>
      </div>
    </div>

    <!-- Mobile / full menu -->
    <nav v-if="open" id="mobile-menu" class="drawer" @click="open = false">
      <router-link to="/">Home</router-link>
      <router-link to="/shop">Shop All</router-link>
      <div v-for="department in departments" :key="department.name" class="drawer-group">
        <router-link to="/shop" class="drawer-title">{{ department.name }}</router-link>
        <span>{{ department.items.join(' · ') }}</span>
      </div>
      <router-link to="/contact">Visit Our Store</router-link>
      <router-link to="/cart">Cart ({{ cartCount }})</router-link>
    </nav>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { cartCount } from '../../store/cart'
import { departments } from '../../data/site'

const open = ref(false)
const header = ref(null)
const categoryMenu = ref(null)
const route = useRoute()

function closeMenus() {
  open.value = false
  if (categoryMenu.value) categoryMenu.value.open = false
}

function handleDocumentPointer(event) {
  if (!header.value?.contains(event.target)) closeMenus()
}

function handleDocumentKeydown(event) {
  if (event.key === 'Escape') closeMenus()
}

watch(() => route.fullPath, closeMenus)
onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointer)
  document.addEventListener('keydown', handleDocumentKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointer)
  document.removeEventListener('keydown', handleDocumentKeydown)
})
</script>

<style scoped>
.header { position: sticky; top: 0; z-index: 50; background: rgba(250, 249, 246, 0.96); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
.topline { display: flex; align-items: center; gap: 20px; height: 29px; padding: 0 16px; overflow: hidden; background: var(--dark); color: #eee8d9; font-size: 8px; letter-spacing: 0.16em; }
.ticker { min-width: 0; flex: 1; overflow: hidden; }
.ticker-track { display: flex; width: max-content; animation: ticker-scroll 28s linear infinite; }
.ticker-group { display: flex; flex: none; align-items: center; gap: 42px; padding-right: 42px; white-space: nowrap; }
.ticker-group span:first-child { color: var(--gold); }
.ticker-group i { padding: 0 7px; color: var(--gold); font-style: normal; }
.topline:hover .ticker-track, .topline:focus-within .ticker-track { animation-play-state: paused; }
.topline-visit { flex: none; color: var(--gold); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; clip-path: inset(50%); }
@keyframes ticker-scroll { to { transform: translateX(-50%); } }
.bar { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 82px; }
.links { display: flex; gap: 26px; }
.links a, .category-menu summary, .cart, .menu-btn { font-size: 9px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; }
.links a:hover, .cart:hover, .category-menu summary:hover { color: var(--accent); }
.logo { display: flex; justify-content: center; align-items: center; }
.logo img { display: block; width: 70px; height: 70px; object-fit: cover; border-radius: 50%; transition: transform .3s; }
.logo:hover img { transform: scale(1.05); }
.category-menu { position: relative; }
.category-menu summary { list-style: none; cursor: pointer; }
.category-menu summary::-webkit-details-marker { display: none; }
.category-menu summary span { color: var(--accent); margin-left: 4px; }
.mega-menu { display: none; position: absolute; top: calc(100% + 28px); left: -20px; z-index: 5; width: min(660px, 85vw); padding: 28px; background: #fff; border: 1px solid var(--line); box-shadow: 0 16px 40px #11100e1a; grid-template-columns: repeat(2, 1fr); gap: 22px 30px; }
.category-menu[open] .mega-menu { display: grid; }
.menu-group { display: flex; flex-direction: column; gap: 7px; color: var(--muted); font-size: 11px; }
.menu-group .group-title { color: var(--text); font-family: var(--font-heading); font-size: 17px; letter-spacing: 0.03em; margin-bottom: 3px; }
.menu-cta { grid-column: 1 / -1; color: var(--accent); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; border-top: 1px solid var(--line); padding-top: 14px; }
.right { display: flex; justify-content: flex-end; align-items: center; gap: 28px; }
.menu-btn { background: none; border: none; display: flex; align-items: center; gap: 10px; }
.burger { display: flex; flex-direction: column; gap: 5px; }
.burger i { display: block; width: 24px; height: 1px; background: var(--dark); }
.drawer { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 26px 20px 36px; border-top: 1px solid var(--line); background: var(--bg); }
.drawer > a { font-family: var(--font-heading); font-size: 20px; text-transform: uppercase; letter-spacing: 0.08em; }
.drawer-group { text-align: center; }
.drawer-title { font-family: var(--font-heading); font-size: 17px; text-transform: uppercase; letter-spacing: 0.08em; }
.drawer-group span { display: block; color: var(--muted); font-size: 11px; margin-top: 3px; }

@media (min-width: 801px) {
  .menu-btn { display: none; }
}
@media (max-width: 800px) {
  .links { display: none; }
  .bar { grid-template-columns: 1fr auto; height: 70px; }
  .logo { grid-column: 1; grid-row: 1; justify-content: flex-start; }
  .logo img { width: 58px; height: 58px; }
  .right { grid-column: 2; grid-row: 1; gap: 18px; }
}
@media (max-width: 420px) {
  .topline { gap: 10px; padding: 0 10px; font-size: 7px; letter-spacing: 0.1em; }
  .ticker-group { gap: 24px; padding-right: 24px; }
  .cart, .menu-btn { font-size: 9px; letter-spacing: 0.1em; }
  .right { gap: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .ticker-track { animation: none; }
}
</style>
