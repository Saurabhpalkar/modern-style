<!-- Layout for admin pages: sidebar + content -->
<template>
  <div class="admin">
    <aside class="sidebar">
      <div class="brand">MODERN STYLE<small>Admin Panel</small></div>
      <nav>
        <router-link to="/admin" exact-active-class="active">Dashboard</router-link>
        <router-link to="/admin/products" active-class="active">Products</router-link>
        <router-link to="/admin/orders" active-class="active">Orders</router-link>
        <router-link to="/">View Website</router-link>
      </nav>
      <button class="logout" @click="logout">Logout</button>
    </aside>
    <section class="content">
      <router-view />
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  localStorage.removeItem('ms_admin')
  router.push({ name: 'admin-login' })
}
</script>

<style scoped>
.admin { display: flex; min-height: 100vh; }
.sidebar { width: 230px; background: var(--dark); color: #fff; padding: 28px 20px; display: flex; flex-direction: column; flex-shrink: 0; }
.brand { font-family: var(--font-heading); letter-spacing: 0.1em; font-size: 18px; margin-bottom: 36px; }
.brand small { display: block; font-family: var(--font-body); font-size: 10px; letter-spacing: 0.2em; color: #999; text-transform: uppercase; margin-top: 4px; }
nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
nav a { padding: 11px 14px; font-size: 13px; color: #bbb; }
nav a:hover, nav a.active { background: #2b2b2b; color: #fff; }
.logout { background: none; border: 1px solid #555; color: #ccc; padding: 10px; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; }
.logout:hover { background: #fff; color: #000; }
.content { flex: 1; padding: 36px; overflow-x: auto; }
@media (max-width: 800px) {
  .admin { flex-direction: column; }
  .sidebar { width: 100%; padding: 16px; }
  nav { flex-direction: row; flex-wrap: wrap; margin-bottom: 12px; }
  .content { padding: 20px 16px; }
}
</style>
