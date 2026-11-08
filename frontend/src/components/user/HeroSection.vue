<template>
  <section
    class="hero"
    aria-label="Modern Style store highlights"
    aria-roledescription="carousel"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @focusin="stopAutoplay"
    @focusout="handleFocusOut"
  >
    <div class="backdrop">
      <Transition name="fade">
        <img
          :key="slides[current].image"
          class="hero-art"
          :class="{ 'photo-shop': slides[current].isShop, 'photo-festival': slides[current].isFestival }"
          :src="slides[current].image"
          :alt="slides[current].imageAlt"
        />
      </Transition>
      <div v-if="!slides[current].isFestival" class="photo-caption">
        <span>{{ slides[current].photoLabel }}</span>
        <span>{{ slides[current].photoLocation }}</span>
      </div>
    </div>
    <div class="shade"></div>

    <div class="hero-content container">
      <Transition name="copy" mode="out-in">
        <div v-if="!slides[current].isFestival" :key="current" class="hero-copy">
          <p class="eyebrow">{{ slides[current].eyebrow }}</p>
          <h1 class="heading heading-xl">{{ slides[current].title }}</h1>
          <p class="sub">{{ slides[current].description }}</p>
          <div class="actions">
            <router-link to="/shop" class="btn">Explore the collection <span aria-hidden="true">→</span></router-link>
            <router-link to="/contact" class="store-link">Visit our store</router-link>
          </div>
        </div>
      </Transition>
    </div>

    <div class="carousel-controls container">
      <span class="location">Try it. Wear it. Love it.</span>
      <div class="controls">
        <span class="count">{{ String(current + 1).padStart(2, '0') }} <i></i> {{ String(slides.length).padStart(2, '0') }}</span>
        <div class="dots" aria-label="Choose a slide">
          <button
            v-for="(slide, index) in slides"
            :key="slide.image"
            type="button"
            :aria-label="`Show slide ${index + 1}: ${slide.title}`"
            :aria-pressed="current === index"
            :class="{ active: current === index }"
            @click="selectSlide(index)"
          ></button>
        </div>
        <button class="arrow" type="button" aria-label="Previous slide" @click="previous">←</button>
        <button class="arrow" type="button" aria-label="Next slide" @click="next">→</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    image: '/images/diwali-festive-gift-combos.webp',
    imageAlt: 'Festive Gift Combos featuring traditional embroidered clothing and a diya',
    isFestival: true,
    title: 'Festive Gift Combos',
  },
  {
    image: '/images/clothing/shirt-rack.jpg',
    imageAlt: 'A colourful row of shirts hanging together on a clothing rack',
    eyebrow: 'EVERYDAY STYLE · EASY TO FIND',
    photoLabel: 'A LITTLE STYLE INSPIRATION',
    photoLocation: 'EXPLORE THE COLLECTION',
    title: 'Good style.\nFor every day.',
    description: 'Find easy everyday favourites, from shirts and tees to the essentials you reach for most.',
  },
  {
    image: '/images/modern-style-shop.jpeg',
    imageAlt: 'The Modern Style storefront in Virar East',
    isShop: true,
    eyebrow: 'MODERN STYLE · VIRAR EAST',
    photoLabel: 'OUR REAL STORE',
    photoLocation: 'VIRAR EAST',
    title: 'Your local store.\nYour everyday style.',
    description: 'Come see the real Modern Style storefront in Virar East and discover your next favourite look.',
  },
  {
    image: '/images/clothing/knitwear-rack.jpg',
    imageAlt: 'A close-up of clothes in different colours hanging on a store rack',
    eyebrow: 'A LITTLE STYLE INSPIRATION',
    photoLabel: 'MADE FOR EVERYDAY',
    photoLocation: 'EXPLORE THE COLLECTION',
    title: 'More to discover.\nMade for every day.',
    description: 'Browse everyday favourites and find easy styles for the whole family.',
  },
]
const current = ref(0)
let timer
let reducedMotion = false

function stopAutoplay() {
  clearInterval(timer)
  timer = undefined
}

function startAutoplay() {
  stopAutoplay()
  if (!reducedMotion) timer = setInterval(advance, 5500)
}

function advance() {
  current.value = (current.value + 1) % slides.length
}

function next() {
  advance()
  startAutoplay()
}

function previous() {
  current.value = (current.value - 1 + slides.length) % slides.length
  startAutoplay()
}

function selectSlide(index) {
  current.value = index
  startAutoplay()
}

function handleFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) startAutoplay()
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  startAutoplay()
})
onUnmounted(stopAutoplay)
</script>

<style scoped>
.hero { position: relative; display: flex; height: calc(100vh - 111px); height: calc(100svh - 111px); min-height: 560px; align-items: center; overflow: hidden; color: #fff; background: #19231d; }
.backdrop, .shade { position: absolute; inset: 0; }
.backdrop { overflow: hidden; background: #26382c; }
.backdrop::after { position: absolute; inset: 16px; border: 1px solid #ffffff38; content: ''; pointer-events: none; }
.backdrop :deep(.hero-art) { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 45%; animation: photo-arrive 8s ease-out both; }
.backdrop :deep(.photo-shop) { object-position: center 38%; }
.photo-caption { position: absolute; z-index: 1; right: 42px; bottom: 112px; display: flex; flex-direction: column; align-items: flex-end; gap: 5px; color: #fff; text-align: right; text-shadow: 0 1px 12px #000b; }
.photo-caption span:first-child { padding: 8px 11px; background: #19231dce; color: #f0cd7a; font-size: 8px; letter-spacing: .16em; }
.photo-caption span:last-child { font-size: 7px; letter-spacing: .13em; }
.shade { background: linear-gradient(90deg, #101710e8 0%, #101710c9 32%, #10171070 57%, #10171012 100%), linear-gradient(0deg, #101710b3 0%, transparent 36%, #10171016 100%); }
.hero-content { position: relative; z-index: 1; padding-top: 40px; padding-bottom: 90px; }
.hero-copy { max-width: 850px; }
.eyebrow { color: #e7c572; margin-bottom: 22px; }
.eyebrow span { padding: 0 5px; }
.hero-content h1 { max-width: 850px; white-space: pre-line; font-size: clamp(44px, 5vw, 64px); text-shadow: 0 2px 24px #0005; }
.sub { max-width: 440px; margin-top: 20px; color: #f1eee8; font-size: 15px; }
.actions { display: flex; align-items: center; gap: 26px; flex-wrap: wrap; margin-top: 30px; }
.actions .btn { border-color: var(--gold); background: var(--gold); color: #17130b; }
.actions .btn:hover { border-color: #fff; background: #fff; }
.store-link { padding-bottom: 4px; border-bottom: 1px solid #ffffffa6; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; }
.store-link:hover { color: #e7c572; border-color: #e7c572; }
.carousel-controls { position: absolute; z-index: 1; right: 0; bottom: 0; left: 0; display: flex; justify-content: space-between; align-items: center; min-height: 76px; border-top: 1px solid #ffffff50; }
.location { color: #f1eee8; font-family: var(--font-heading); font-size: 15px; letter-spacing: 0.06em; }
.controls { display: flex; align-items: center; gap: 12px; }
.count { display: flex; align-items: center; gap: 9px; margin-right: 10px; font-size: 10px; letter-spacing: 0.12em; }
.count i { width: 28px; height: 1px; background: #ffffffa6; }
.dots { display: flex; align-items: center; gap: 7px; margin: 0 8px; }
.dots button { width: 7px; height: 7px; padding: 0; border: 1px solid #fff; border-radius: 50%; background: transparent; transition: 0.2s; }
.dots button.active { width: 22px; border-color: var(--gold); border-radius: 6px; background: var(--gold); }
.arrow { width: 38px; height: 38px; border: 1px solid #ffffff80; border-radius: 50%; background: transparent; color: #fff; font-size: 16px; transition: 0.2s; }
.arrow:hover { border-color: var(--gold); background: var(--gold); color: var(--dark); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.copy-enter-active, .copy-leave-active { transition: opacity .24s ease, transform .24s ease; }
.copy-enter-from { opacity: 0; transform: translateY(10px); }
.copy-leave-to { opacity: 0; transform: translateY(-6px); }
@keyframes photo-arrive { from { transform: scale(1.045); } to { transform: scale(1); } }

@media (max-width: 600px) {
  .hero { height: calc(100vh - 99px); height: calc(100svh - 99px); min-height: 620px; align-items: flex-start; }
  .backdrop::after { inset: 10px 10px 78px; }
  .backdrop :deep(.hero-art) { object-position: center 43%; }
  .backdrop :deep(.photo-shop) { object-position: center 35%; }
  .photo-caption { right: 22px; bottom: 94px; }
  .shade { background: linear-gradient(180deg, #101710bd 0%, #10171078 30%, #1017101a 55%, #1017104d 76%, #101710cf 100%); }
  .hero-content { padding-top: 48px; }
  .eyebrow { margin-bottom: 18px; }
  .hero-content h1 { max-width: 100%; font-size: clamp(32px, 8.2vw, 38px); }
  .sub { max-width: 330px; font-size: 13px; }
  .actions { gap: 18px; margin-top: 18px; }
  .actions .btn { padding: 13px 16px; font-size: 9px; }
  .carousel-controls { min-height: 68px; }
  .location { font-size: 12px; }
  .controls { gap: 7px; }
  .count { gap: 6px; margin-right: 1px; font-size: 9px; }
  .count i { width: 16px; }
  .dots { gap: 5px; margin: 0 3px; }
  .arrow { width: 32px; height: 32px; }
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active, .fade-leave-active, .backdrop :deep(.hero-art) { transition: none; animation: none; }
}
</style>
