<!-- Customer review with arrows to go next / previous -->
<template>
  <section class="container reviews">
    <p class="eyebrow">Verified Clients</p>
    <h2 class="heading heading-lg">Real stories from our<br />happy customers</h2>

    <div class="body">
      <div class="left">
        <div class="quote">“</div>
        <p class="text">“ {{ current.text }} ”</p>
        <div class="foot">
          <div>
            <strong>{{ current.name }}</strong>
            <small>{{ current.role }}</small>
          </div>
          <div class="arrows">
            <button @click="prev" aria-label="Previous">←</button>
            <button class="dark" @click="next" aria-label="Next">→</button>
          </div>
        </div>
      </div>
      <img class="portrait" :src="current.image" :alt="current.name" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { testimonials } from '../../data/site'

const index = ref(0)
const current = computed(() => testimonials[index.value])
const next = () => (index.value = (index.value + 1) % testimonials.length)
const prev = () => (index.value = (index.value - 1 + testimonials.length) % testimonials.length)
</script>

<style scoped>
.reviews { padding-top: 60px; padding-bottom: 70px; max-width: 920px; }
.reviews .eyebrow { margin-bottom: 14px; }
.body { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; margin-top: 40px; }
.left { display: flex; flex-direction: column; justify-content: space-between; }
.quote { font-family: var(--font-heading); font-size: 160px; line-height: 0.7; color: #ddd8d5; height: 70px; }
.text { font-size: 20px; line-height: 1.5; font-weight: 400; margin: 40px 0; }
.foot { display: flex; justify-content: space-between; align-items: flex-end; }
.foot strong { display: block; font-weight: 500; font-size: 13px; }
.foot small { font-size: 11px; color: var(--muted); }
.arrows { display: flex; }
.arrows button { width: 36px; height: 36px; border: none; background: #fff; font-size: 14px; }
.arrows .dark { background: var(--dark); color: #fff; }
.portrait { width: 100%; aspect-ratio: 1 / 1.05; object-fit: cover; }
@media (max-width: 700px) { .body { grid-template-columns: 1fr; } .portrait { order: -1; } .text { font-size: 17px; margin: 20px 0; } }
</style>
