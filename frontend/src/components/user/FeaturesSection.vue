<template>
  <section v-reveal class="features-wrap">
    <div class="container features">
      <div class="photo-stack">
        <div class="main-photo">
          <img src="/images/store-shelves.jpg" alt="Clothing shelves inside the Modern Style store" loading="lazy">
          <span class="photo-label">A STORE FOR EVERYDAY FINDS</span>
        </div>
        <div class="rack-photo">
          <img src="/images/clothing/shirt-rack.jpg" alt="Colourful shirts hanging together on a clothing rack" loading="lazy">
          <span>Find your new favourite</span>
        </div>
        <span class="store-stamp"><i>MS</i><span>MODERN STYLE<br>VIRAR EAST</span></span>
      </div>

      <div class="story">
        <p class="eyebrow">A little more personal</p>
        <h2 class="heading heading-lg">Your neighbourhood store for everyday style.</h2>
        <p class="intro">Modern Style brings clothing and daily essentials together in one friendly local shop. Browse online, then visit us to explore more and find the fit that feels right.</p>

        <div class="story-points">
          <div v-for="(feature, index) in features" :key="feature.no" class="point">
            <span class="no">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3 class="heading">{{ feature.title }}</h3>
              <p>{{ feature.text }}</p>
            </div>
            <span class="point-mark" aria-hidden="true">↗</span>
          </div>
        </div>

        <router-link to="/contact" class="visit-link">
          <span>Come visit us in Virar East</span>
          <i aria-hidden="true">→</i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { features } from '../../data/site'
</script>

<style scoped>
.features-wrap { position: relative; z-index: 0; isolation: isolate; overflow: hidden; padding: 82px 0 96px; }
.features-wrap::before { position: absolute; z-index: -1; inset: 0; background: linear-gradient(115deg, #eee4d7 0%, #f5f0e8 48%, #e8eee8 100%); content: ''; }
.features { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, .92fr); align-items: center; gap: clamp(46px, 8vw, 105px); }
.photo-stack { position: relative; min-width: 0; padding: 0 54px 58px 0; }
.main-photo { position: relative; width: 100%; aspect-ratio: 1.12; overflow: hidden; background: #d7d0c4; box-shadow: 0 20px 50px #392a191f; }
.main-photo::after { position: absolute; inset: 45% 0 0; background: linear-gradient(transparent, #11110f9c); content: ''; }
.main-photo img, .rack-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .75s cubic-bezier(.2,.7,.2,1); }
.photo-stack:hover img { transform: scale(1.035); }
.photo-label { position: absolute; z-index: 1; bottom: 20px; left: 22px; color: #fff; font-size: 8px; letter-spacing: .16em; }
.rack-photo { position: absolute; right: 0; bottom: 0; width: 43%; aspect-ratio: .82; padding: 8px; background: #fff; box-shadow: 0 14px 35px #30261730; transform: rotate(3deg); transition: transform .4s cubic-bezier(.2,.7,.2,1); }
.photo-stack:hover .rack-photo { transform: rotate(0) translateY(-4px); }
.rack-photo img { display: block; }
.rack-photo span { position: absolute; right: 8px; bottom: 8px; left: 8px; padding: 8px 7px; background: #171710b8; color: #fff; font-size: 7px; letter-spacing: .09em; text-align: center; text-transform: uppercase; }
.store-stamp { position: absolute; top: 20px; right: 20px; display: flex; align-items: center; gap: 8px; padding: 9px 12px; background: #fffF; color: var(--text); box-shadow: 0 4px 16px #2c24151a; }
.store-stamp i { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 50%; background: var(--dark); color: var(--gold); font-family: var(--font-heading); font-size: 12px; font-style: normal; }
.store-stamp span { font-size: 7px; letter-spacing: .11em; line-height: 1.5; }
.story .eyebrow { margin-bottom: 12px; color: var(--accent); }
.story h2 { max-width: 570px; font-size: clamp(30px, 4vw, 47px); }
.intro { max-width: 520px; margin-top: 16px; color: var(--muted); font-size: 12px; line-height: 1.9; }
.story-points { margin-top: 27px; border-top: 1px solid #9a8b743c; }
.point { display: grid; grid-template-columns: 35px minmax(0, 1fr) 25px; align-items: center; gap: 12px; padding: 15px 0; border-bottom: 1px solid #9a8b743c; transition: padding .25s ease, color .25s ease; }
.point:hover { padding-right: 5px; padding-left: 5px; color: #8d672f; }
.no { color: #9a743d; font-size: 9px; letter-spacing: .1em; }
.point h3 { margin-bottom: 3px; font-size: 14px; }
.point p { max-width: 420px; color: var(--muted); font-size: 10px; }
.point-mark { justify-self: end; color: #9a743d; font-size: 13px; transition: transform .25s; }
.point:hover .point-mark { transform: translate(2px, -2px); }
.visit-link { display: flex; width: fit-content; align-items: center; gap: 20px; margin-top: 23px; padding: 12px 15px; border: 1px solid var(--dark); background: var(--dark); color: #fff; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; transition: background .25s, color .25s, transform .25s; }
.visit-link:hover { transform: translateY(-2px); border-color: var(--accent); background: var(--accent); color: #fff; }
.visit-link i { font-size: 15px; font-style: normal; }
@media (max-width: 800px) {
  .features-wrap { padding: 62px 0 70px; }
  .features { grid-template-columns: 1fr; gap: 42px; }
  .photo-stack { max-width: 620px; padding-right: 48px; }
  .main-photo { aspect-ratio: 1.25; }
  .story { max-width: 680px; }
}
@media (max-width: 500px) {
  .features-wrap { padding: 48px 0 56px; }
  .features { gap: 34px; }
  .photo-stack { padding: 0 32px 38px 0; }
  .main-photo { aspect-ratio: 1; }
  .photo-label { bottom: 13px; left: 13px; font-size: 7px; }
  .rack-photo { width: 42%; padding: 6px; }
  .rack-photo span { right: 6px; bottom: 6px; left: 6px; padding: 6px 4px; font-size: 6px; }
  .store-stamp { top: 10px; right: 10px; gap: 6px; padding: 6px 8px; }
  .store-stamp i { width: 25px; height: 25px; font-size: 10px; }
  .store-stamp span { font-size: 6px; }
  .story h2 { font-size: clamp(27px, 8vw, 36px); }
  .point { grid-template-columns: 27px minmax(0, 1fr) 18px; gap: 8px; padding: 13px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .main-photo img, .rack-photo, .point, .point-mark, .visit-link { transition: none; }
}
</style>
