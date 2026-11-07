<template>
  <footer class="footer">
    <div class="container grid">
      <div class="brand">
        <img class="brand-logo" src="/images/modern-style-logo.png" alt="Modern Style Men's Wear" />
        <p class="sub">{{ shop.tagline.toUpperCase() }} · VIRAR EAST</p>
        <p class="addr">{{ shop.address }}</p>
      </div>

      <div class="col">
        <h4>Support</h4>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/cart">Cart</router-link>
        <a v-if="shop.whatsapp" :href="`https://wa.me/${shop.whatsapp}`" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
      <div class="col">
        <h4>Explore</h4>
        <router-link to="/shop">New Arrivals</router-link>
        <router-link to="/shop">Best Sellers</router-link>
        <router-link to="/shop">Shirts</router-link>
        <router-link to="/shop">Jeans</router-link>
      </div>
      <div class="col">
        <h4>Visit Us</h4>
        <span>{{ shop.hours }}</span>
        <span v-if="shop.phone">{{ shop.phone }}</span>
        <span v-if="shop.email">{{ shop.email }}</span>
      </div>
    </div>
    <div class="container copy">© {{ new Date().getFullYear() }} Modern Style Men's Wear. All rights reserved.</div>
  </footer>
</template>

<script setup>
import { shop } from '../../data/site'
</script>

<style scoped>
.footer { background: var(--dark); color: #fff; padding: 70px 0 24px; margin-top: 40px; }
.grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1.2fr; gap: 40px; }
.brand-logo { width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 14px; }
.sub { font-size: 9px; letter-spacing: 0.3em; color: #999; margin: 6px 0 22px; }
.addr { font-size: 12px; color: #aaa; max-width: 300px; }
.col { display: flex; flex-direction: column; gap: 10px; font-size: 12px; color: #bbb; }
.col h4 { font-weight: 400; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #777; margin-bottom: 6px; }
.col a:hover { color: #fff; }
.copy { margin-top: 60px; padding-top: 20px; border-top: 1px solid #333; font-size: 11px; color: #777; }
@media (max-width: 800px) { .grid { grid-template-columns: 1fr 1fr; } .brand { grid-column: 1 / -1; } }
</style>
