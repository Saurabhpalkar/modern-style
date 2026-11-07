<template>
  <section v-reveal class="container checkout">
    <div class="head">
      <p class="eyebrow">Almost yours</p>
      <h1 class="heading heading-lg">Delivery & payment</h1>
    </div>

    <!-- After order is placed -->
    <div v-if="orderNumber" class="center done">
      <p class="eyebrow">Thank you</p>
      <h2 class="heading heading-md">Order {{ orderNumber }} received</h2>
      <p>We will call you to confirm your order. You can also pick it up from our store in Virar.</p>
      <router-link to="/shop" class="btn">Continue Shopping</router-link>
    </div>

    <div v-else-if="!cartItems.length" class="center done">
      <p>Your cart is empty.</p>
      <router-link to="/shop" class="btn">Go to Shop</router-link>
    </div>

    <form v-else class="layout" @submit.prevent="submit">
      <div class="delivery">
        <h3 class="heading heading-md">Delivery Details</h3>
        <div class="field"><label>Full Name</label><input v-model="form.name" required /></div>
        <div class="two">
          <div class="field"><label>Phone</label><input v-model="form.phone" type="tel" required /></div>
          <div class="field"><label>Email (optional)</label><input v-model="form.email" type="email" /></div>
        </div>
        <div class="field"><label>Address</label><textarea v-model="form.address" rows="3" required></textarea></div>
        <div class="two">
          <div class="field"><label>City</label><input v-model="form.city" required /></div>
          <div class="field"><label>Pincode</label><input v-model="form.pincode" required /></div>
        </div>
        <div class="field">
          <label>Payment</label>
          <select v-model="form.payment">
            <option value="cod">Cash on Delivery / Pay at store</option>
            <option value="upi">UPI (Paytm / GPay)</option>
          </select>
        </div>
      </div>

      <aside class="summary">
        <h3 class="heading heading-md">Your Order</h3>
        <div v-for="i in cartItems" :key="i.id + i.size" class="row">
          <span>{{ i.name }} ({{ i.size }}) × {{ i.qty }}</span>
          <span>{{ formatPrice(i.price * i.qty) }}</span>
        </div>
        <div class="row total"><span>Total</span><span>{{ formatPrice(cartTotal) }}</span></div>
        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <button class="btn" type="submit" :disabled="placing">{{ placing ? 'Sending order...' : 'Place Order' }}</button>
      </aside>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { cartItems, cartTotal, clearCart } from '../../store/cart'
import { formatPrice } from '../../data/products'
import { placeOrder } from '../../services/api'

const form = reactive({ name: '', phone: '', email: '', address: '', city: 'Virar', pincode: '401305', payment: 'cod' })
const orderNumber = ref('')
const error = ref('')
const placing = ref(false)

async function submit() {
  if (placing.value) return
  placing.value = true
  error.value = ''
  try {
    const result = await placeOrder({ customer: { ...form }, items: cartItems.value, total: cartTotal.value })
    orderNumber.value = result.orderNumber
    clearCart()
  } catch (requestError) {
    error.value = requestError instanceof Error
      ? `We couldn't confirm your order. ${requestError.message} Your cart is unchanged.`
      : "We couldn't confirm your order. Please try again; your cart is unchanged."
  } finally {
    placing.value = false
  }
}
</script>

<style scoped>
.checkout { padding-top: 62px; padding-bottom: 90px; }
.head { margin-bottom: 36px; }
.head .eyebrow { margin-bottom: 8px; color: var(--accent); }
.layout { display: grid; grid-template-columns: 1fr 380px; gap: 36px; margin-top: 0; align-items: start; }
.delivery, .summary { min-width: 0; padding: 30px; border: 1px solid var(--line); background: #fff; }
.layout h3 { margin-bottom: 24px; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.summary { position: sticky; top: 130px; }
.row { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; padding: 9px 0; }
.total { border-top: 1px solid var(--line); margin: 10px 0 24px; font-weight: 500; font-size: 15px; }
.summary .btn { width: 100%; }
.summary .btn:disabled { cursor: wait; opacity: .65; }
.error { margin: -10px 0 16px; color: #9c3434; font-size: 11px; }
.done { margin-top: 50px; color: var(--muted); }
.done h2 { color: var(--text); margin: 10px 0 14px; }
.done .btn { margin-top: 24px; }
@media (max-width: 800px) { .layout { grid-template-columns: 1fr; } .two { grid-template-columns: 1fr; gap: 0; } }
@media (max-width: 800px) {
  .checkout { padding-top: 34px; padding-bottom: 60px; }
  .delivery, .summary { padding: 22px 18px; }
  .summary { position: static; }
}
</style>
