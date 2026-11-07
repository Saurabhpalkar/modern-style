<template>
  <article class="card">
    <div class="image-wrap">
      <router-link :to="`/product/${product.id}`" class="image-link" :aria-label="`View ${product.name}`">
        <ProductPhoto :product="product" :view="cardViews[cardViewIndex].value" />
      </router-link>
      <template v-if="cardViews.length > 1 && !choosingSize && !notice">
        <button
          type="button"
          class="photo-arrow photo-previous"
          :aria-label="`Previous photo of ${product.name}`"
          @click.stop="changeCardView(-1)"
        >‹</button>
        <button
          type="button"
          class="photo-arrow photo-next"
          :aria-label="`Next photo of ${product.name}`"
          @click.stop="changeCardView(1)"
        >›</button>
        <div class="photo-pages" :aria-label="`Photo ${cardViewIndex + 1} of ${cardViews.length}: ${cardViews[cardViewIndex].label}`">
          <button
            v-for="(photo, index) in cardViews"
            :key="photo.value"
            type="button"
            :aria-label="`${photo.label} photo of ${product.name}`"
            :aria-pressed="cardViewIndex === index"
            :class="{ selected: cardViewIndex === index }"
            @click.stop="cardViewIndex = index"
          ></button>
        </div>
      </template>

      <span class="category">{{ product.category }}</span>
      <div class="actions">
        <button
          type="button"
          class="icon-btn"
          :class="{ liked: isWishlisted(product.id) }"
          :aria-label="isWishlisted(product.id) ? 'Remove from favourites' : 'Add to favourites'"
          :aria-pressed="isWishlisted(product.id)"
          @click="toggleWishlist(product.id)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z" /></svg>
        </button>
        <button type="button" class="icon-btn" :aria-label="`Quick view ${product.name}`" @click="openQuickView">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.2 12s3.5-6.2 9.8-6.2 9.8 6.2 9.8 6.2-3.5 6.2-9.8 6.2S2.2 12 2.2 12Z" /><circle cx="12" cy="12" r="2.8" /></svg>
        </button>
        <button type="button" class="icon-btn bag-btn" :aria-label="`Choose size to add ${product.name} to cart`" @click="choosingSize = !choosingSize">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8.5h14l1.2 12H3.8L5 8.5Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /><path d="M9.5 13h5" /></svg>
        </button>
      </div>

      <div v-if="choosingSize" class="size-picker">
        <div class="picker-head">
          <span>Choose a size</span>
          <button type="button" aria-label="Close size picker" @click="choosingSize = false">×</button>
        </div>
        <div class="picker-sizes">
          <button v-for="size in product.sizes" :key="size" type="button" @click="quickAdd(size)">{{ size }}</button>
        </div>
      </div>
      <span v-if="notice" class="added-notice" role="status">{{ notice }}</span>
    </div>

    <div class="product-info">
      <router-link :to="`/product/${product.id}`" class="product-name">{{ product.name }}</router-link>
      <span class="price">{{ formatPrice(product.price) }}</span>
    </div>
    <span class="hint">{{ product.sizes.length }} sizes <i>·</i> Tap the eye for a closer look</span>

    <dialog ref="dialog" class="quick-view" @click.self="closeQuickView">
      <button class="close" type="button" aria-label="Close quick view" @click="closeQuickView">×</button>
      <div class="quick-layout">
        <div class="quick-art">
          <ProductPhoto :product="product" :view="view" />
          <div class="view-tabs" aria-label="Product photo views">
            <button v-for="option in views" :key="option.value" type="button" :class="{ selected: view === option.value }" @click="view = option.value">{{ option.label }}</button>
          </div>
        </div>
        <div class="quick-details">
          <p class="eyebrow">{{ product.category }} · MODERN STYLE</p>
          <h2 class="heading heading-md">{{ product.name }}</h2>
          <p class="quick-price">{{ formatPrice(product.price) }}</p>
          <p class="description">{{ product.description }}</p>
          <span class="size-label">Choose a size</span>
          <div class="quick-sizes">
            <button v-for="size in product.sizes" :key="size" type="button" :class="{ selected: selectedSize === size }" :aria-pressed="selectedSize === size" @click="selectedSize = size">{{ size }}</button>
          </div>
          <button type="button" class="add-button" :disabled="!selectedSize" @click="quickAdd(selectedSize)">Add to bag <span>{{ selectedSize || 'Select size' }} →</span></button>
          <router-link :to="`/product/${product.id}`" class="details-link" @click="closeQuickView">See full product details ↗</router-link>
        </div>
      </div>
    </dialog>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import ProductPhoto from './ProductPhoto.vue'
import { formatPrice, getProductPhotoViews } from '../../data/products'
import { addToCart } from '../../store/cart'
import { isWishlisted, toggleWishlist } from '../../store/wishlist'

const props = defineProps({ product: { type: Object, required: true } })
const dialog = ref(null)
const choosingSize = ref(false)
const cardViewIndex = ref(0)
const selectedSize = ref('')
const view = ref('front')
const notice = ref('')
const cardViews = getProductPhotoViews(props.product)
const views = cardViews
let noticeTimer

function changeCardView(direction) {
  if (cardViews.length > 1) {
    cardViewIndex.value = (cardViewIndex.value + direction + cardViews.length) % cardViews.length
  }
}

function openQuickView() {
  selectedSize.value = props.product.sizes[0] || ''
  view.value = cardViews[0]?.value || 'front'
  choosingSize.value = false
  dialog.value?.showModal()
}

function closeQuickView() {
  dialog.value?.close()
}

function quickAdd(size) {
  if (!size) return
  addToCart(props.product, size)
  choosingSize.value = false
  notice.value = `${size} added to bag`
  clearTimeout(noticeTimer)
  noticeTimer = setTimeout(() => (notice.value = ''), 2400)
  closeQuickView()
}
</script>

<style scoped>
.card { display: block; min-width: 0; }
.image-wrap { position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: var(--bg-soft); }
.image-link { display: block; width: 100%; height: 100%; }
.image-link :deep(.product-photo) { transition: transform .6s cubic-bezier(.2,.7,.2,1); }
.image-link:hover :deep(.product-photo) { transform: scale(1.035); }
.photo-arrow { position: absolute; z-index: 2; top: 50%; display: grid; width: 30px; height: 30px; place-items: center; transform: translateY(-50%); border: 1px solid #e8e4da; border-radius: 50%; background: #ffffffed; color: var(--text); font-size: 19px; line-height: 1; opacity: 0; transition: opacity .2s, background .2s, color .2s; }
.photo-previous { left: 10px; }
.photo-next { right: 10px; }
.card:hover .photo-arrow, .card:focus-within .photo-arrow { opacity: 1; }
.photo-arrow:hover { background: var(--dark); color: #fff; }
.photo-pages { position: absolute; z-index: 2; bottom: 11px; left: 50%; display: flex; gap: 5px; padding: 6px 8px; transform: translateX(-50%); border-radius: 20px; background: #ffffffe8; }
.photo-pages button { width: 6px; height: 6px; padding: 0; border: 0; border-radius: 50%; background: #aaa69d; transition: width .2s, background .2s; }
.photo-pages button.selected { width: 17px; border-radius: 6px; background: var(--dark); }
.photo-pages button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.category { position: absolute; z-index: 2; top: 13px; left: 13px; padding: 6px 9px; background: #fffF; color: var(--text); font-size: 7px; letter-spacing: .1em; text-transform: uppercase; }
.actions { position: absolute; z-index: 2; top: 13px; right: 12px; display: flex; flex-direction: column; gap: 7px; }
.icon-btn { display: flex; width: 34px; height: 34px; align-items: center; justify-content: center; border: 1px solid #e8e4da; border-radius: 50%; background: #fff; color: var(--text); transition: color .2s, background .2s, transform .2s, border-color .2s; }
.icon-btn:hover { transform: translateY(-2px); border-color: var(--dark); background: var(--dark); color: #fff; }
.icon-btn.liked { border-color: #9c4952; color: #9c4952; }
.icon-btn.liked:hover { background: #9c4952; color: #fff; }
.icon-btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.size-picker { position: absolute; z-index: 3; right: 11px; bottom: 11px; left: 11px; padding: 11px; background: #fff; box-shadow: 0 6px 24px #15130f26; animation: picker-in .18s ease-out; }
.picker-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }
.picker-head button { border: 0; background: transparent; color: var(--muted); font-size: 18px; }
.picker-sizes { display: flex; flex-wrap: wrap; gap: 6px; }
.picker-sizes button, .quick-sizes button { min-width: 35px; height: 32px; padding: 0 7px; border: 1px solid var(--line); background: #fff; font-size: 10px; transition: background .2s, color .2s, border-color .2s; }
.picker-sizes button:hover, .quick-sizes button:hover, .quick-sizes button.selected { border-color: var(--dark); background: var(--dark); color: #fff; }
.added-notice { position: absolute; z-index: 4; right: 10px; bottom: 10px; left: 10px; padding: 11px; background: var(--dark); color: #fff; text-align: center; font-size: 10px; letter-spacing: .08em; animation: picker-in .2s ease-out; }
.product-info { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding: 13px 0 2px; }
.product-name { overflow: hidden; font-family: var(--font-heading); font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.product-name:hover { color: var(--accent); }
.price { flex-shrink: 0; font-size: 11px; font-weight: 400; }
.hint { color: var(--muted); font-size: 9px; }
.hint i { padding: 0 3px; color: var(--accent); font-style: normal; }
.quick-view { position: fixed; inset: auto; top: 50%; left: 50%; width: min(820px, calc(100vw - 32px)); max-width: 820px; max-height: min(640px, calc(100dvh - 32px)); margin: 0; padding: 0; transform: translate(-50%, -50%); border: 0; background: #fff; color: var(--text); box-shadow: 0 24px 90px #0005; }
.quick-view[open] { animation: modal-in .22s ease-out; }
.quick-view::backdrop { background: #1716119c; backdrop-filter: blur(4px); }
.close { position: absolute; z-index: 3; top: 12px; right: 12px; display: grid; width: 36px; height: 36px; place-items: center; border: 1px solid var(--line); border-radius: 50%; background: #fff; color: var(--text); font-size: 23px; }
.quick-layout { display: grid; min-height: 440px; grid-template-columns: 1fr 1fr; }
.quick-art { position: relative; min-height: 440px; }
.quick-art :deep(.product-photo) { position: absolute; inset: 0; }
.view-tabs { position: absolute; z-index: 2; right: 10px; bottom: 10px; left: 10px; display: flex; justify-content: center; gap: 6px; }
.view-tabs button { padding: 8px 13px; border: 1px solid #d5cfbf; background: #fff; font-size: 8px; letter-spacing: .1em; text-transform: uppercase; }
.view-tabs button.selected { border-color: var(--dark); background: var(--dark); color: #fff; }
.quick-details { display: flex; flex-direction: column; justify-content: center; padding: 40px; }
.eyebrow { margin-bottom: 12px; color: var(--accent); font-size: 8px; letter-spacing: .16em; }
.quick-details h2 { font-size: 24px; }
.quick-price { margin: 14px 0; font-family: var(--font-heading); font-size: 23px; }
.description { margin-bottom: 24px; color: var(--muted); font-size: 11px; }
.size-label { margin-bottom: 8px; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
.quick-sizes { display: flex; flex-wrap: wrap; gap: 7px; }
.quick-sizes button { min-width: 39px; height: 37px; }
.add-button { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding: 14px 16px; border: 1px solid var(--dark); background: var(--dark); color: #fff; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; transition: background .2s; }
.add-button:hover:not(:disabled) { border-color: var(--accent); background: var(--accent); }
.add-button:disabled { opacity: .6; cursor: not-allowed; }
.details-link { align-self: flex-start; margin-top: 16px; color: var(--muted); font-size: 9px; text-decoration: underline; text-underline-offset: 3px; }

@keyframes picker-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes modal-in { from { opacity: 0; transform: translate(-50%, calc(-50% + 10px)) scale(.99); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
@media (max-width: 600px) {
  .category { top: 8px; left: 8px; padding: 5px 6px; font-size: 6px; }
  .actions { top: 8px; right: 7px; gap: 5px; }
  .icon-btn { width: 30px; height: 30px; }
  .icon-btn svg { width: 14px; height: 14px; }
  .photo-arrow { width: 27px; height: 27px; font-size: 17px; opacity: 1; }
  .photo-previous { left: 7px; }
  .photo-next { right: 7px; }
  .quick-view { width: calc(100vw - 24px); max-height: calc(100dvh - 24px); overflow-y: auto; }
  .quick-layout { grid-template-columns: 1fr; }
  .quick-art { min-height: 300px; height: 42dvh; }
  .quick-details { padding: 22px; }
  .quick-details h2 { font-size: 21px; }
}
@media (prefers-reduced-motion: reduce) {
  .quick-view[open], .size-picker, .added-notice { animation: none; }
}
</style>
