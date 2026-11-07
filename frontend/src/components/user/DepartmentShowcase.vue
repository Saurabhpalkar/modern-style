<template>
  <section v-reveal class="departments container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Something for everyone</p>
        <h2 class="heading heading-lg">Browse by department</h2>
      </div>
      <p class="intro">From everyday outfits to daily essentials, find your kind of comfort at Modern Style.</p>
    </div>

    <div class="grid">
      <router-link
        v-for="(department, index) in departments"
        :key="department.name"
        :to="{ name: 'shop', query: { category: department.name } }"
        class="department"
        :class="`department-${index + 1}`"
        :style="{ '--card-index': index }"
      >
        <span class="number">0{{ index + 1 }} <i></i> DEPARTMENT</span>
        <div class="category-collage" :class="`photo-count-${department.photos.length}`">
          <div v-for="photo in department.photos" :key="photo.label" class="category-photo">
            <img :src="photo.image" :alt="`${photo.label} in ${department.name}`" loading="lazy">
            <span>{{ photo.label }}</span>
          </div>
        </div>
        <div class="department-copy">
          <div>
            <p class="items">{{ department.items.join(' · ') }}</p>
            <h3 class="heading">{{ department.name }}</h3>
          </div>
          <span class="arrow" aria-hidden="true">↗</span>
          <span class="explore">Explore collection <i aria-hidden="true">→</i></span>
        </div>
      </router-link>
    </div>

    <div class="browse-all">
      <router-link to="/shop" class="link-arrow">Explore all styles &nbsp;→</router-link>
    </div>
  </section>
</template>

<script setup>
import { departments } from '../../data/site'
</script>

<style scoped>
.departments { position: relative; z-index: 0; isolation: isolate; padding-top: 88px; padding-bottom: 82px; }
.departments::before { position: absolute; z-index: -1; inset: 0; box-shadow: 0 0 0 100vmax #f1e7d8; background: linear-gradient(125deg, #f1e7d8 0%, #f5f0e8 44%, #e8eee8 100%); clip-path: inset(0 -100vmax); content: ''; }
.section-head { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 34px; }
.section-head .eyebrow { margin-bottom: 10px; color: var(--accent); }
.intro { max-width: 350px; color: var(--muted); font-size: 13px; }
.section-head .heading { margin-top: 4px; }
.grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: 335px; gap: 15px; }
.department { position: relative; display: flex; min-width: 0; flex-direction: column; overflow: hidden; padding: 14px; border: 1px solid #ffffffc7; background: #fff; color: var(--text); box-shadow: 0 8px 22px #5440290b; transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s, border-color .35s; animation: card-rise .6s both; animation-delay: calc(var(--card-index) * 90ms); }
.department:hover { transform: translateY(-7px); border-color: #d4ae68; box-shadow: 0 18px 34px #54402924; }
.department-1, .department-4 { transform: translateY(13px); }
.department-1:hover, .department-4:hover { transform: translateY(6px); }
.number { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; margin: 0 0 12px 2px; color: #96713a; font-size: 8px; letter-spacing: .16em; }
.number i { width: 19px; height: 1px; background: #b58a3b80; }
.category-collage { display: grid; flex: 1; min-height: 205px; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 5px; overflow: hidden; border-radius: 2px; background: #e9e3d8; }
.photo-count-2 { grid-template-rows: minmax(0, 1fr); }
.photo-count-3 { grid-template-rows: repeat(2, minmax(0, 1fr)); }
.photo-count-3 .category-photo:last-child { grid-column: 1 / -1; }
.category-photo { position: relative; min-width: 0; min-height: 0; overflow: hidden; background: #ded8ce; }
.category-photo:first-child:last-child { grid-row: 1 / -1; grid-column: 1 / -1; }
.category-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .65s cubic-bezier(.2,.7,.2,1), filter .35s; }
.category-photo span { position: absolute; right: 6px; bottom: 6px; left: 6px; overflow: hidden; padding: 5px 7px; background: #171710a6; color: #fff; font-size: 8px; letter-spacing: .09em; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
.department:hover .category-photo img { transform: scale(1.055); filter: saturate(1.08); }
.department-copy { position: relative; display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 2px 8px; padding: 15px 3px 1px; }
.department-copy > div { min-width: 0; padding-right: 25px; }
.items { margin-bottom: 5px; color: var(--muted); font-size: 8px; letter-spacing: .08em; text-transform: uppercase; }
.department h3 { max-width: 320px; font-size: clamp(16px, 1.55vw, 21px); line-height: 1.2; }
.explore { display: inline-flex; align-items: center; gap: 8px; margin-top: 9px; color: #916b31; font-size: 8px; letter-spacing: .12em; text-transform: uppercase; transition: gap .25s; }
.department:hover .explore { gap: 14px; }
.arrow { position: absolute; right: 15px; bottom: 42px; display: grid; width: 30px; height: 30px; place-items: center; border: 1px solid #b58a3b88; border-radius: 50%; background: #fff; color: #80602d; font-size: 13px; transition: background .25s, border-color .25s, color .25s, transform .25s; }
.department:hover .arrow { transform: rotate(45deg); border-color: var(--dark); background: var(--dark); color: #fff; }
.department:focus-visible { z-index: 2; outline: 2px solid var(--accent); outline-offset: 3px; }
.browse-all { margin-top: 30px; text-align: center; }
.browse-all .link-arrow { padding-bottom: 8px; }

@keyframes card-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 330px; gap: 12px; }
  .department { padding: 12px; }
  .department-1, .department-4 { transform: none; }
  .department-1:hover, .department-4:hover { transform: translateY(-7px); }
  .department h3 { font-size: clamp(18px, 2.8vw, 24px); }
}
@media (max-width: 600px) {
  .departments { padding-top: 58px; padding-bottom: 56px; }
  .section-head { display: block; margin-bottom: 23px; }
  .intro { margin-top: 12px; }
  .grid { grid-auto-rows: 300px; gap: 9px; }
  .department { padding: 9px; }
  .number { gap: 6px; margin-bottom: 8px; font-size: 7px; }
  .number i { width: 12px; }
  .category-collage { min-height: 150px; gap: 3px; }
  .category-photo span { right: 3px; bottom: 3px; left: 3px; padding: 4px; font-size: 6px; }
  .department-copy { padding-top: 10px; }
  .items { font-size: 7px; letter-spacing: .04em; }
  .department h3 { font-size: clamp(14px, 3.8vw, 19px); }
  .department-copy > div { padding-right: 0; }
  .explore { gap: 5px; margin-top: 7px; font-size: 7px; }
  .arrow { right: 7px; bottom: 33px; width: 24px; height: 24px; font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .department, .department:hover, .department-1, .department-4 { transform: none; animation: none; }
  .category-photo img, .department, .explore, .arrow { transition: none; }
}
</style>
