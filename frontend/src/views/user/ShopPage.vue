<template>
  <section v-reveal class="container shop">
    <div class="shop-hero" aria-label="Modern Style collection banner">
      <div class="shop-hero__inner">
        <p class="eyebrow">Modern Style · Virar East</p>
        <div class="shop-sign" aria-hidden="true">
          <span class="shop-sign__monogram">MS</span>
          <span class="shop-sign__word">मोडन स्टाइल</span>
        </div>
        <h1 class="heading heading-lg">Explore the collection</h1>
        <p class="intro">Browse the styles currently featured online. More of our in-store range is shown by department on the home page.</p>
      </div>
    </div>

    <div class="shop-layout">
      <button
        type="button"
        class="mobile-filter-toggle"
        :aria-expanded="filtersOpen"
        aria-controls="shop-filters"
        @click="filtersOpen = !filtersOpen"
      >
        {{ filtersOpen ? 'Hide filters' : 'Show filters' }}
        <span>{{ activeFilterCount ? `(${activeFilterCount})` : '' }}</span>
      </button>

      <aside id="shop-filters" class="filters" :class="{ 'filters-open': filtersOpen }" aria-label="Product filters">
        <div class="filter-heading">
          <h2>Filters</h2>
          <button type="button" class="clear-filters" @click="clearFilters">Clear all</button>
        </div>

        <section class="filter-group" aria-labelledby="category-title">
          <h3 id="category-title">Category</h3>
          <label v-for="item in categoryOptions" :key="item.name" class="filter-option">
            <input v-model="category" type="radio" name="category" :value="item.name">
            <span>{{ item.name }}</span>
            <small>{{ item.count }}</small>
          </label>
        </section>

        <section class="filter-group" aria-labelledby="type-title">
          <h3 id="type-title">Product type</h3>
          <label v-for="item in typeOptions" :key="item.value" class="filter-option">
            <input v-model="selectedTypes" type="checkbox" :value="item.value">
            <span>{{ item.label }}</span>
            <small>{{ item.count }}</small>
          </label>
        </section>

        <section class="filter-group" aria-labelledby="size-title">
          <h3 id="size-title">Size</h3>
          <div class="size-options">
            <label v-for="size in sizeOptions" :key="size" class="size-option">
              <input v-model="selectedSizes" type="checkbox" :value="size">
              <span>{{ size }}</span>
            </label>
          </div>
        </section>

        <section class="filter-group price-filter" aria-labelledby="price-title">
          <div class="price-heading">
            <h3 id="price-title">Price</h3>
            <span>Up to Rs. {{ priceLimit }}</span>
          </div>
          <input
            v-model.number="priceLimit"
            class="price-range"
            type="range"
            :min="minimumPrice"
            :max="maximumPrice"
            :step="priceStep"
            aria-label="Maximum price"
          >
          <div class="price-bounds">
            <span>Rs. {{ minimumPrice }}</span>
            <span>Rs. {{ maximumPrice }}</span>
          </div>
        </section>
      </aside>

      <div class="results">
        <div class="toolbar">
          <p class="count"><strong>{{ shown.length }}</strong> {{ shown.length === 1 ? 'style' : 'styles' }} found</p>
          <label class="sort-control">
            <span>Sort by</span>
            <select v-model="sort" aria-label="Sort products">
              <option value="">Recommended</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        <div v-if="activeFilterCount" class="active-filters" aria-label="Active filters">
          <span>Applied:</span>
          <button v-if="category !== 'All'" type="button" @click="category = 'All'">{{ category }} <span aria-hidden="true">×</span></button>
          <button v-for="type in selectedTypes" :key="`type-${type}`" type="button" @click="removeType(type)">{{ typeLabel(type) }} <span aria-hidden="true">×</span></button>
          <button v-for="size in selectedSizes" :key="`size-${size}`" type="button" @click="removeSize(size)">Size {{ size }} <span aria-hidden="true">×</span></button>
          <button v-if="priceLimit < maximumPrice" type="button" @click="priceLimit = maximumPrice">Up to Rs. {{ priceLimit }} <span aria-hidden="true">×</span></button>
        </div>

        <div v-if="shown.length" class="grid">
          <ProductCard v-for="p in shown" :key="p.id" :product="p" />
        </div>
        <div v-else class="center empty">
          <p>No styles match these filters.</p>
          <button type="button" class="reset-button" @click="clearFilters">Clear filters</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProducts } from '../../services/api'
import { categories } from '../../data/site'
import ProductCard from '../../components/common/ProductCard.vue'

const all = ref([])
const route = useRoute()
const category = ref('All')
const selectedTypes = ref([])
const selectedSizes = ref([])
const sort = ref('')
const filtersOpen = ref(false)

onMounted(async () => (all.value = await getProducts()))

const minimumPrice = computed(() => all.value.length ? Math.min(...all.value.map((product) => product.price)) : 0)
const maximumPrice = computed(() => all.value.length ? Math.max(...all.value.map((product) => product.price)) : 0)
const priceStep = computed(() => Math.max(1, Math.ceil((maximumPrice.value - minimumPrice.value) / 10 / 10) * 10))
const priceLimit = ref(0)
watch(maximumPrice, (value) => (priceLimit.value = value), { immediate: true })
watch(() => route.query.category, (value) => {
  const requestedCategory = typeof value === 'string' && categories.includes(value) ? value : 'All'
  if (category.value !== requestedCategory) category.value = requestedCategory
}, { immediate: true })
watch(category, (value) => {
  const products = value === 'All' ? all.value : all.value.filter((product) => product.category === value)
  const availableTypes = new Set(products.map((product) => product.type))
  const availableSizes = new Set(products.flatMap((product) => product.sizes))
  selectedTypes.value = selectedTypes.value.filter((type) => availableTypes.has(type))
  selectedSizes.value = selectedSizes.value.filter((size) => availableSizes.has(size))
})

const categoryOptions = computed(() => categories.map((name) => ({
  name,
  count: name === 'All' ? all.value.length : all.value.filter((product) => product.category === name).length,
})))

const typeOptions = computed(() => {
  const products = category.value === 'All'
    ? all.value
    : all.value.filter((product) => product.category === category.value)
  return [...new Set(products.map((product) => product.type))]
    .sort()
    .map((value) => ({
      value,
      label: typeLabel(value),
      count: products.filter((product) => product.type === value).length,
    }))
})

const sizeOptions = computed(() => {
  const products = category.value === 'All'
    ? all.value
    : all.value.filter((product) => product.category === category.value)
  return [...new Set(products.flatMap((product) => product.sizes))]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
})

const activeFilterCount = computed(() => (
  Number(category.value !== 'All')
  + selectedTypes.value.length
  + selectedSizes.value.length
  + Number(priceLimit.value < maximumPrice.value)
))

const shown = computed(() => {
  let list = all.value.filter((product) => {
    const matchesCategory = category.value === 'All' || product.category === category.value
    const matchesType = !selectedTypes.value.length || selectedTypes.value.includes(product.type)
    const matchesSize = !selectedSizes.value.length || selectedSizes.value.some((size) => product.sizes.includes(size))
    return matchesCategory && matchesType && matchesSize && product.price <= priceLimit.value
  })

  if (sort.value === 'low') list.sort((a, b) => a.price - b.price)
  if (sort.value === 'high') list.sort((a, b) => b.price - a.price)
  if (sort.value === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
  return list
})

function typeLabel(value) {
  return value === 'tshirt' ? 'T-shirt' : value.charAt(0).toUpperCase() + value.slice(1)
}

function removeType(type) {
  selectedTypes.value = selectedTypes.value.filter((value) => value !== type)
}

function removeSize(size) {
  selectedSizes.value = selectedSizes.value.filter((value) => value !== size)
}

function clearFilters() {
  category.value = 'All'
  selectedTypes.value = []
  selectedSizes.value = []
  priceLimit.value = maximumPrice.value
  sort.value = ''
}

</script>

<style scoped>
.shop { padding-top: 72px; padding-bottom: 100px; }
.shop-hero {
  position: relative;
  overflow: hidden;
  padding: 48px 34px 52px;
  border: 1px solid rgba(180, 131, 55, 0.35);
  background:
    linear-gradient(180deg, rgba(8, 24, 27, 0.82), rgba(16, 25, 24, 0.9)),
    linear-gradient(120deg, #0b1f20 0%, #1a2f2d 38%, #f4d29d 130%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}
.shop-hero::before {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.12), transparent 35%, transparent 65%, rgba(255,255,255,0.12)),
    repeating-linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 2px, transparent 2px, transparent 7px);
  content: '';
}
.shop-hero::after {
  position: absolute;
  top: 50%;
  right: 10%;
  width: 160px;
  height: 160px;
  border: 1px solid rgba(212, 174, 104, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 0 18px rgba(212, 174, 104, 0.08), 0 0 0 36px rgba(212, 174, 104, 0.04);
  content: '';
  transform: translateY(-50%);
}
.shop-hero__inner { position: relative; z-index: 1; text-align: center; }
.shop-hero .eyebrow {
  margin-bottom: 12px;
  color: #f7d28d;
  letter-spacing: 0.18em;
}
.shop-sign {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 2vw, 26px);
  margin: 0 auto 14px;
  color: #f4d7a4;
  font-family: var(--font-heading);
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
}
.shop-sign__monogram {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  padding-bottom: 8px;
  border-bottom: 3px solid rgba(244, 215, 164, 0.55);
  border-radius: 40%;
  color: #f2e4c7;
  font-size: clamp(48px, 7vw, 120px);
  font-weight: 700;
  line-height: 0.9;
  transform: scaleY(1.08);
}
.shop-sign__word {
  font-size: clamp(28px, 4vw, 72px);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.shop-hero h1 {
  position: relative;
  z-index: 1;
  font-size: clamp(30px, 4vw, 46px);
  color: #f5efd8;
}
.intro {
  position: relative;
  z-index: 1;
  max-width: 620px;
  margin: 14px auto 0;
  color: rgba(250, 240, 217, 0.8);
  font-size: 12px;
}
.shop-layout { display: grid; grid-template-columns: 220px minmax(0, 1fr); align-items: start; gap: 30px; margin-top: 38px; }
.filters { position: sticky; top: 24px; border: 1px solid var(--line); background: #fff; }
.filter-heading { display: flex; justify-content: space-between; align-items: center; padding: 17px 16px; border-bottom: 1px solid var(--line); }
.filter-heading h2 { font-size: 13px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; }
.clear-filters { border: 0; background: none; color: var(--accent); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
.filter-group { padding: 17px 16px; border-bottom: 1px solid var(--line); }
.filter-group:last-child { border-bottom: 0; }
.filter-group h3 { margin-bottom: 13px; font-size: 10px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; }
.filter-option { display: flex; align-items: center; gap: 9px; min-height: 28px; color: var(--text); cursor: pointer; font-size: 11px; }
.filter-option input { width: 13px; height: 13px; margin: 0; accent-color: var(--dark); }
.filter-option span { flex: 1; }
.filter-option small { color: var(--muted); font-size: 9px; }
.size-options { display: flex; flex-wrap: wrap; gap: 7px; }
.size-option input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.size-option span { display: grid; min-width: 38px; height: 34px; place-items: center; border: 1px solid var(--line); color: var(--muted); cursor: pointer; font-size: 10px; transition: .2s; }
.size-option input:checked + span { border-color: var(--dark); background: var(--dark); color: #fff; }
.size-option input:focus-visible + span { outline: 2px solid var(--accent); outline-offset: 2px; }
.price-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.price-heading h3 { margin-bottom: 12px; }
.price-heading span, .price-bounds { color: var(--muted); font-size: 9px; }
.price-range { width: 100%; accent-color: var(--dark); }
.price-bounds { display: flex; justify-content: space-between; margin-top: 3px; }
.mobile-filter-toggle { display: none; }
.toolbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 0 0 16px; border-bottom: 1px solid var(--line); }
.count { color: var(--muted); font-size: 11px; }
.count strong { color: var(--text); font-weight: 500; }
.sort-control { display: flex; align-items: center; gap: 9px; color: var(--muted); font-size: 10px; }
.sort-control select { min-width: 160px; background: #fff; border: 1px solid var(--line); padding: 9px 11px; font-family: inherit; font-size: 11px; color: var(--text); }
.active-filters { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; padding: 14px 0 0; color: var(--muted); font-size: 9px; }
.active-filters button { padding: 5px 8px; border: 1px solid var(--line); background: #fff; color: var(--text); font-family: inherit; font-size: 9px; }
.active-filters button span { padding-left: 4px; color: var(--accent); font-size: 12px; }
.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 34px 22px; padding-top: 22px; }
.empty { padding: 72px 16px; color: var(--muted); font-size: 13px; }
.reset-button { margin-top: 16px; padding: 10px 15px; border: 1px solid var(--dark); background: var(--dark); color: #fff; font-family: inherit; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; }
@media (max-width: 1000px) {
  .shop-layout { grid-template-columns: 200px minmax(0, 1fr); gap: 22px; }
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 700px) {
  .shop { padding-top: 32px; padding-bottom: 62px; }
  .head { padding: 36px 16px; }
  .head::after { right: 3%; width: 88px; height: 88px; }
  .intro { max-width: 390px; }
  .shop-layout { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
  .mobile-filter-toggle { display: flex; width: 100%; justify-content: space-between; align-items: center; padding: 12px 14px; border: 1px solid var(--line); background: #fff; color: var(--text); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; }
  .mobile-filter-toggle span { color: var(--accent); }
  .filters { position: static; display: none; width: 100%; }
  .filters.filters-open { display: block; }
  .results { width: 100%; }
  .toolbar { align-items: flex-start; }
  .sort-control { align-items: flex-start; flex-direction: column; gap: 4px; }
  .sort-control select { min-width: 145px; }
  .grid { gap: 24px 12px; padding-top: 18px; }
}
</style>
