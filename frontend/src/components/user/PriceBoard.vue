<!-- "Best Prices" list, same as the board outside the shop -->
<template>
  <section v-reveal class="prices">
    <div class="container">
      <div class="heading-row">
        <div>
          <p class="eyebrow">A little value goes a long way</p>
          <h2 class="heading heading-lg">Easy everyday prices</h2>
        </div>
        <span class="seal">MS <i>EST. VIRAR</i></span>
      </div>
      <ul class="price-list">
        <li v-for="item in priceBoard" :key="item.name">
          <span>{{ item.name }}</span><b>{{ formatPrice(item.price) }}</b>
        </li>
      </ul>
      <p class="note">Prices shown at our store. Please visit us for the full selection.</p>
    </div>
  </section>
</template>

<script setup>
import { priceBoard } from '../../data/site'
import { formatPrice } from '../../data/products'
</script>

<style scoped>
.prices { position: relative; overflow: hidden; background: var(--dark); color: #fff; padding: 70px 0 62px; }
.prices::before, .prices::after { position: absolute; width: 320px; height: 320px; border: 1px solid #d4ae681c; border-radius: 50%; content: ''; pointer-events: none; }
.prices::before { top: -190px; right: 12%; box-shadow: 0 0 0 24px #d4ae6808, 0 0 0 50px #d4ae6806; }
.prices::after { bottom: -270px; left: -150px; }
.heading-row { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.prices .eyebrow { color: var(--gold); margin-bottom: 12px; }
.prices .heading { color: #fff; }
.seal { display: flex; align-items: center; justify-content: center; flex-direction: column; width: 74px; height: 74px; border: 1px solid #d4ae687a; border-radius: 50%; color: var(--gold); font-family: var(--font-heading); font-size: 18px; }
.seal i { font-family: var(--font-body); font-size: 6px; font-style: normal; letter-spacing: .15em; }
.price-list { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 34px; }
li { display: flex; justify-content: space-between; flex-direction: column; gap: 12px; min-height: 84px; padding: 16px; border: 1px solid #ffffff24; background: #ffffff08; font-size: 10px; letter-spacing: .08em; text-transform: uppercase; transition: background .25s, border-color .25s, transform .25s; }
li:hover { transform: translateY(-4px); border-color: #d4ae687a; background: #ffffff10; }
li b { color: var(--gold); font-family: var(--font-heading); font-size: 21px; font-weight: 400; letter-spacing: 0; }
.note { margin-top: 20px; color: #ffffff80; font-size: 10px; }
@media (max-width: 800px) { .price-list { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px) {
  .prices { padding: 52px 0; }
  .seal { width: 60px; height: 60px; flex-shrink: 0; }
  .price-list { grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 28px; }
  li { min-height: 78px; padding: 13px; }
}
</style>
