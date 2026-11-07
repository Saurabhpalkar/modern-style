<!-- Product list with add / edit / delete. Works on mock data only (resets on refresh). -->
<template>
  <div class="top">
    <h1 class="heading heading-lg">Products</h1>
    <button class="btn" @click="openForm()">+ Add Product</button>
  </div>

  <table class="table">
    <thead><tr><th></th><th>Name</th><th>Category</th><th>Price</th><th></th></tr></thead>
    <tbody>
      <tr v-for="p in list" :key="p.id">
        <td><img :src="p.image" :alt="p.name" /></td>
        <td>{{ p.name }}</td>
        <td>{{ p.category }}</td>
        <td>{{ formatPrice(p.price) }}</td>
        <td class="actions">
          <button @click="openForm(p)">Edit</button>
          <button class="del" @click="remove(p)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Add / edit form -->
  <div v-if="form" class="overlay" @click.self="form = null">
    <form class="modal" @submit.prevent="save">
      <h3 class="heading heading-md">{{ form.id ? 'Edit Product' : 'Add Product' }}</h3>
      <div class="field"><label>Name</label><input v-model="form.name" required /></div>
      <div class="field">
        <label>Category</label>
        <select v-model="form.category"><option v-for="c in categories.slice(1)" :key="c">{{ c }}</option></select>
      </div>
      <div class="field"><label>Price (Rs.)</label><input v-model.number="form.price" type="number" required /></div>
      <div class="field"><label>Image path</label><input v-model="form.image" placeholder="/images/clothing/formal-shirt.jpg" /></div>
      <div class="field"><label>Description</label><textarea v-model="form.description" rows="3"></textarea></div>
      <button class="btn" type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { products } from '../../data/products'
import { categories } from '../../data/site'
import { formatPrice } from '../../data/products'

const list = ref([...products])
const form = ref(null)

function openForm(product) {
  form.value = product
    ? { ...product }
    : { name: '', category: "Men's Wear", price: 399, image: '/images/clothing/formal-shirt.jpg', description: '', sizes: ['M', 'L', 'XL'] }
}

function save() {
  if (form.value.id) {
    const i = list.value.findIndex((p) => p.id === form.value.id)
    list.value[i] = form.value
  } else {
    form.value.id = Date.now()
    list.value.push(form.value)
  }
  form.value = null
}

function remove(product) {
  if (confirm('Delete ' + product.name + '?')) list.value = list.value.filter((p) => p.id !== product.id)
}
</script>

<style scoped>
.top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.table { width: 100%; background: #fff; border-collapse: collapse; font-size: 14px; }
.table th { text-align: left; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); font-weight: 400; }
.table th, .table td { padding: 14px 16px; border-bottom: 1px solid var(--line); }
.table img { width: 46px; height: 56px; object-fit: cover; }
.actions { white-space: nowrap; }
.actions button { background: none; border: none; text-decoration: underline; font-size: 13px; margin-right: 14px; }
.actions .del { color: var(--accent); }
.overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
.modal { background: var(--bg); padding: 32px; width: 100%; max-width: 460px; max-height: 90vh; overflow-y: auto; }
.modal h3 { margin-bottom: 22px; }
</style>
