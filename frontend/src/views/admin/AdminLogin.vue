<!-- Temporary admin login. Demo only: email admin@modernstyle.in / password admin123 -->
<template>
  <div class="wrap">
    <form class="box" @submit.prevent="login">
      <div class="logo">MODERN STYLE</div>
      <p class="eyebrow">Admin Login</p>
      <div class="field"><label>Email</label><input v-model="email" type="email" required /></div>
      <div class="field"><label>Password</label><input v-model="password" type="password" required /></div>
      <p v-if="error" class="error">{{ error }}</p>
      <button class="btn" type="submit">Login</button>
      <p class="hint">Demo: admin@modernstyle.in / admin123</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

function login() {
  // TODO: replace with Laravel login API call
  if (email.value === 'admin@modernstyle.in' && password.value === 'admin123') {
    localStorage.setItem('ms_admin', '1')
    router.push({ name: 'admin-dashboard' })
  } else {
    error.value = 'Wrong email or password'
  }
}
</script>

<style scoped>
.wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.box { background: #fff; padding: 44px 40px; width: 100%; max-width: 400px; text-align: center; }
.logo { font-family: var(--font-heading); font-size: 26px; letter-spacing: 0.12em; }
.eyebrow { margin: 8px 0 30px; }
.field { text-align: left; }
.error { color: var(--accent); font-size: 13px; margin-bottom: 14px; }
.btn { width: 100%; }
.hint { margin-top: 18px; font-size: 11px; color: var(--muted); }
</style>
