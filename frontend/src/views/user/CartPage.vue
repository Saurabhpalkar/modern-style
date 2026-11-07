<template>
  <section v-reveal class="container cart">
    <div class="head">
      <p class="eyebrow">Your Modern Style picks</p>
      <h1 class="heading heading-lg">Shopping bag</h1>
    </div>

    <div v-if="cartItems.length" class="layout">
      <div class="items">
        <div v-for="item in cartItems" :key="item.id + item.size" class="item">
          <div class="item-art"><ProductPhoto :product="getPhotoProduct(item)" view="folded" /></div>
          <div class="info">
            <h3 class="heading heading-md">{{ item.name }}</h3>
            <p>Size: {{ item.size }}</p>
            <p>{{ formatPrice(item.price) }}</p>
            <button class="remove" @click="removeFromCart(item)">Remove</button>
          </div>
          <div class="qty">
            <button @click="changeQty(item, item.qty - 1)">−</button>
            <span>{{ item.qty }}</span>
            <button @click="changeQty(item, item.qty + 1)">+</button>
          </div>
          <div class="line">{{ formatPrice(item.price * item.qty) }}</div>
        </div>
      </div>

      <aside class="summary">
        <h3 class="heading heading-md">Summary</h3>
        <div class="row"><span>Subtotal</span><span>{{ formatPrice(cartTotal) }}</span></div>
        <div class="row"><span>Shipping</span><span>Free</span></div>
        <div class="row total"><span>Total</span><span>{{ formatPrice(cartTotal) }}</span></div>
        <router-link to="/checkout" class="btn">Checkout</router-link>
      </aside>
    </div>

    <div v-else class="empty">
      <span class="empty-mark">MS</span>
      <p class="eyebrow">A little space for something new</p>
      <h2 class="heading heading-md">Your bag is waiting.</h2>
      <p>Explore the collection and find an everyday favourite.</p>
      <router-link to="/shop" class="btn">Explore the collection <span aria-hidden="true">→</span></router-link>
    </div>
  </section>
</template>

<script setup>
import { cartItems, cartTotal, changeQty, removeFromCart } from '../../store/cart'
import { formatPrice, products } from '../../data/products'
import ProductPhoto from '../../components/common/ProductPhoto.vue'

function getPhotoProduct(item) {
  return products.find((product) => product.id === item.id) || {
    name: item.name,
    type: 'tshirt',
    image: item.image,
  }
}
</script>

<style scoped>
.cart { padding-top: 62px; padding-bottom: 90px; }
.head { margin-bottom: 32px; }
.head .eyebrow { margin-bottom: 8px; color: var(--accent); }
.layout { display: grid; grid-template-columns: 1fr 340px; gap: 36px; margin-top: 0; align-items: start; }
.items { padding: 0 22px; background: #fff; border: 1px solid var(--line); }
.item { display: grid; grid-template-columns: 100px 1fr auto 110px; gap: 20px; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--line); }
.item-art { width: 100px; height: 125px; overflow: hidden; }
.info p { font-size: 13px; color: var(--muted); }
.info h3 { font-size: 16px; margin-bottom: 4px; }
.remove { background: none; border: none; text-decoration: underline; font-size: 12px; margin-top: 6px; color: var(--muted); }
.qty { display: flex; align-items: center; border: 1px solid var(--line); }
.qty button { width: 34px; height: 34px; background: none; border: none; font-size: 16px; }
.qty span { width: 28px; text-align: center; font-size: 13px; }
.line { text-align: right; font-family: var(--font-heading); }
.summary { position: sticky; top: 130px; background: #fff; border: 1px solid var(--line); padding: 28px; }
.summary h3 { margin-bottom: 20px; }
.row { display: flex; justify-content: space-between; font-size: 14px; padding: 10px 0; }
.total { border-top: 1px solid var(--line); margin: 10px 0 24px; font-weight: 500; }
.summary .btn { width: 100%; text-align: center; }
.empty { display: flex; flex-direction: column; align-items: center; margin-top: 35px; padding: 62px 20px; border: 1px solid var(--line); background: linear-gradient(140deg, #fff, #f3f0e9); text-align: center; color: var(--muted); }
.empty-mark { display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; margin-bottom: 18px; border: 1px solid var(--accent); border-radius: 50%; color: var(--accent); font-family: var(--font-heading); font-size: 20px; }
.empty .eyebrow { margin-bottom: 7px; color: var(--accent); }
.empty h2 { color: var(--text); }
.empty > p:not(.eyebrow) { margin-top: 9px; font-size: 12px; }
.empty .btn { margin-top: 22px; }
@media (max-width: 800px) {
  .layout { grid-template-columns: 1fr; }
  .items { padding: 0 14px; }
  .item { grid-template-columns: 80px 1fr auto; gap: 12px; }
  .item-art { width: 80px; height: 100px; }
  .qty { grid-column: 2; justify-self: start; }
  .line { grid-column: 3; grid-row: 2; }
  .summary { position: static; }
}
</style>
