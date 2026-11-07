<template>
  <img
    :class="['product-photo', `view-${view}`]"
    :src="source"
    :alt="product.name"
    :loading="loading"
  />
</template>

<script setup>
import { computed } from 'vue'
import { getProductPhotoViews } from '../../data/products'

const props = defineProps({
  product: { type: Object, required: true },
  view: { type: String, default: 'front' },
  loading: { type: String, default: 'lazy' },
})

const source = computed(() => {
  const views = getProductPhotoViews(props.product)
  return views.find((option) => option.value === props.view)?.source || props.product.image
})
</script>

<style scoped>
.product-photo { display: block; width: 100%; height: 100%; object-fit: cover; background: var(--bg-soft); }
.view-detail { object-position: center; }
.view-folded { object-position: center; }
</style>
