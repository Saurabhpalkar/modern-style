<template>
  <section class="container contact">
    <div v-reveal class="head">
      <p class="eyebrow">Come see us in person</p>
      <h1 class="heading heading-lg">Your local style stop<br />in Virar East.</h1>
      <p class="intro">Try it on, find your fit and discover the collection at Modern Style.</p>
    </div>

    <div v-reveal class="visit-card">
      <div class="store-photo">
        <ProductPhoto :product="products[0]" loading="eager" />
        <span>MODERN STYLE · TRY IT WEAR IT</span>
      </div>

      <div class="info">
        <p class="eyebrow">A friendly local shop</p>
        <h2 class="heading heading-md">{{ shop.name }} {{ shop.type }}</h2>
        <p class="tag">{{ shop.tagline }}</p>
        <div class="details">
          <div class="detail"><span class="detail-mark">01</span><p><strong>Find us</strong>{{ shop.address }}</p></div>
          <div class="detail"><span class="detail-mark">02</span><p><strong>Store hours</strong>{{ shop.hours }}</p></div>
          <div class="detail"><span class="detail-mark">03</span><p><strong>Get in touch</strong>{{ shop.phone || shop.email ? [shop.phone, shop.email].filter(Boolean).join(' · ') : 'Visit us at the shop during store hours.' }}</p></div>
        </div>
        <div class="actions">
          <a v-if="shop.whatsapp" class="btn" :href="`https://wa.me/${shop.whatsapp}`" target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
          <a class="map-link" :href="mapLink" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
        </div>
      </div>
    </div>

    <div v-reveal class="message-area">
      <div class="message-intro">
        <p class="eyebrow">A friendly local shop</p>
        <h2 class="heading heading-md">Have a question?<br />Come say hello.</h2>
        <p>We'd be happy to help you find a fit or explore the collection in person.</p>
      </div>
      <div class="visit-note">
        <p class="eyebrow">Visit Modern Style</p>
        <h3 class="heading heading-md">Try it. Wear it.</h3>
        <p>Online enquiries aren't available yet. Visit us during store hours and our team can help you in person.</p>
        <span>{{ shop.hours }}</span>
        <a class="btn" :href="mapLink" target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a>
      </div>
    </div>

    <div class="collection-strip">
      <article v-for="product in featuredProducts" :key="product.id" class="collection-item">
        <ProductPhoto :product="product" view="folded" />
        <p>{{ product.name }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { shop } from '../../data/site'
import { products } from '../../data/products'
import ProductPhoto from '../../components/common/ProductPhoto.vue'

const featuredProducts = [products[4], products[9], products[13]]
const mapLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${shop.name} ${shop.type} ${shop.address}`)
</script>

<style scoped>
.contact { padding-top: 58px; padding-bottom: 88px; }
.head { padding: 18px 0 38px; }
.head .eyebrow, .message-intro .eyebrow { margin-bottom: 12px; color: var(--accent); }
.head h1 { font-size: clamp(32px, 5vw, 56px); }
.intro { margin-top: 13px; color: var(--muted); font-size: 13px; }
.visit-card { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); border: 1px solid var(--line); background: #fff; }
.visit-card > * { min-width: 0; }
.store-photo { position: relative; width: 100%; min-width: 0; min-height: 450px; overflow: hidden; background: var(--bg-soft); }
.store-photo::after { position: absolute; inset: 45% 0 0; background: linear-gradient(transparent, #11110f9c); content: ''; }
.store-photo :deep(.product-photo) { position: absolute; inset: 0; transition: transform .7s; }
.visit-card:hover .store-photo :deep(.product-photo) { transform: scale(1.035); }
.store-photo span { position: absolute; z-index: 1; bottom: 20px; left: 22px; color: #fff; font-size: 8px; letter-spacing: .16em; }
.info { padding: clamp(26px, 5vw, 56px); }
.info > .eyebrow { color: var(--accent); }
.info h2 { margin-top: 10px; }
.info .tag { margin: 8px 0 25px; color: var(--muted); font-family: var(--font-heading); font-size: 18px; }
.details { border-top: 1px solid var(--line); }
.detail { display: flex; gap: 14px; padding: 15px 0; border-bottom: 1px solid var(--line); }
.detail-mark { color: var(--accent); font-family: var(--font-heading); font-size: 13px; }
.detail p { color: var(--muted); font-size: 11px; }
.detail strong { display: block; margin-bottom: 4px; color: var(--text); font-size: 9px; font-weight: 400; letter-spacing: .12em; text-transform: uppercase; }
.actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 23px; }
.actions .btn { font-size: 9px; padding: 13px 15px; }
.map-link { font-size: 9px; letter-spacing: .1em; text-transform: uppercase; text-decoration: underline; text-underline-offset: 4px; }
.message-area { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; padding: 82px 0; align-items: start; }
.message-intro p:last-child { max-width: 300px; margin-top: 14px; color: var(--muted); font-size: 12px; }
.visit-note { display: flex; flex-direction: column; align-items: flex-start; padding: 28px; border: 1px solid var(--line); background: #fff; }
.visit-note .eyebrow { margin-bottom: 8px; color: var(--accent); }
.visit-note h3 { margin-bottom: 10px; }
.visit-note > p:not(.eyebrow) { max-width: 380px; color: var(--muted); font-size: 12px; }
.visit-note > span { margin-top: 18px; color: var(--text); font-size: 11px; }
.visit-note .btn { margin-top: 20px; font-size: 9px; }
.collection-strip { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.collection-item { min-width: 0; border: 1px solid var(--line); background: #fff; }
.collection-item :deep(.product-photo) { height: 220px; }
.collection-item p { padding: 12px 14px; font-family: var(--font-heading); font-size: 15px; }
@media (max-width: 800px) {
  .contact { padding-top: 32px; padding-bottom: 58px; }
  .visit-card, .message-area { grid-template-columns: 1fr; }
  .store-photo { min-height: 300px; aspect-ratio: 4 / 3; }
  .message-area { gap: 25px; padding: 54px 0; }
}
@media (max-width: 500px) {
  .info { padding: 24px 18px; }
  .visit-note { padding: 22px 18px; }
  .collection-strip { gap: 8px; }
  .collection-item :deep(.product-photo) { height: 150px; }
  .collection-item p { padding: 9px; font-size: 12px; }
}
</style>
