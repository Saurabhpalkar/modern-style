<template>
  <h1 class="heading heading-lg">Orders</h1>
  <OrdersTable :orders="orders" />
</template>

<script setup>
import { orders } from '../../data/orders'
import OrdersTable from '../../components/admin/OrdersTable.vue'
</script>

<style scoped>
h1 { margin-bottom: 30px; }
</style>
