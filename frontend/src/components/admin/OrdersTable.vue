<template>
  <table class="table">
    <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
    <tbody>
      <tr v-for="o in orders" :key="o.id">
        <td>{{ o.id }}</td>
        <td>{{ o.customer }}</td>
        <td>{{ o.date }}</td>
        <td>{{ formatPrice(o.total) }}</td>
        <td><span class="badge" :class="o.status.toLowerCase()">{{ o.status }}</span></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { formatPrice } from '../../data/products'
defineProps({ orders: { type: Array, required: true } })
</script>

<style scoped>
.table { width: 100%; background: #fff; border-collapse: collapse; font-size: 14px; }
.table th { text-align: left; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); font-weight: 400; }
.table th, .table td { padding: 14px 16px; border-bottom: 1px solid var(--line); }
.badge { font-size: 11px; padding: 3px 10px; background: var(--bg-soft); }
.badge.pending { background: #f6e7c8; }
.badge.delivered { background: #d6ecd8; }
.badge.shipped { background: #d6e4f1; }
</style>
