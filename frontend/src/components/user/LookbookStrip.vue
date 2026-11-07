<!-- Heading + row of photos with different heights (the middle one has a "Click" circle) -->
<template>
  <section id="collections" class="look">
    <div class="center head">
      <p class="eyebrow">The Modern Style Edit</p>
      <h2 class="heading heading-lg">Good style for<br />everyday life</h2>
    </div>
    <div class="strip">
      <router-link v-for="(item, i) in lookbook" :key="i" to="/shop" class="item" :style="{ height: item.h + 'px' }">
        <img :src="item.image" alt="Lookbook" loading="lazy" />
        <span v-if="item.featured" class="circle">Click</span>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { lookbook } from '../../data/site'
</script>

<style scoped>
.look { padding: 60px 0 90px; overflow: hidden; }
.head { position: relative; z-index: 2; margin-bottom: -20px; }
.strip { display: flex; justify-content: center; align-items: center; gap: 26px; padding: 0 20px; }
.item { position: relative; display: block; width: 18%; max-width: 230px; flex-shrink: 0; overflow: hidden; }
.item img { width: 100%; height: 100%; object-fit: cover; }
.item:nth-child(2) { width: 22%; max-width: 280px; }
.circle { position: absolute; top: 50%; left: 50%; width: 76px; height: 76px; margin: -38px 0 0 -38px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; }
@media (max-width: 700px) { .strip { gap: 10px; padding: 0 10px; } .item { height: 180px !important; } .circle { width: 54px; height: 54px; margin: -27px 0 0 -27px; font-size: 7px; } }
</style>
