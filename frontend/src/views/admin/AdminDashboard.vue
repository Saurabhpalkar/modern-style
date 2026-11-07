<template>
  <h1 class="heading heading-lg">Dashboard</h1>

  <div class="stats">
    <div class="stat" v-for="s in stats" :key="s.label">
      <span>{{ s.label }}</span>
      <b>{{ s.value }}</b>
    </div>
  </div>

  <h2 class="heading heading-md">Recent Orders</h2>
  <OrdersTable :orders="orders.slice(0, 4)" />
</template>

<script setup>
import { products } from '../../data/products'
import { orders } from '../../data/orders'
import OrdersTable from '../../components/admin/OrdersTable.vue'

// Numbers are calculated from the mock data
const revenue = orders.reduce((sum, o) => sum + o.total, 0)
const stats = [
  { label: 'Total Orders', value: orders.length },
  { label: 'Revenue', value: 'Rs. ' + revenue.toLocaleString('en-IN') },
  { label: 'Products', value: products.length },
  { label: 'Pending Orders', value: orders.filter((o) => o.status === 'Pending').length },
]
</script>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 18px; margin: 30px 0 44px; }
.stat { background: #fff; padding: 24px; }
.stat span { display: block; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
.stat b { font-family: var(--font-heading); font-weight: 400; font-size: 28px; }
h2 { margin-bottom: 16px; }
</style>
