import { createRouter, createWebHistory } from 'vue-router'

import UserLayout from '../layouts/UserLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// User pages
import HomePage from '../views/user/HomePage.vue'
import ShopPage from '../views/user/ShopPage.vue'
import ProductPage from '../views/user/ProductPage.vue'
import CartPage from '../views/user/CartPage.vue'
import CheckoutPage from '../views/user/CheckoutPage.vue'
import ContactPage from '../views/user/ContactPage.vue'

// Admin pages
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminProducts from '../views/admin/AdminProducts.vue'
import AdminOrders from '../views/admin/AdminOrders.vue'

const routes = [
  // ---- Customer website ----
  {
    path: '/',
    component: UserLayout,
    children: [
      { path: '', name: 'home', component: HomePage },
      { path: 'shop', name: 'shop', component: ShopPage },
      { path: 'product/:id', name: 'product', component: ProductPage },
      { path: 'cart', name: 'cart', component: CartPage },
      { path: 'checkout', name: 'checkout', component: CheckoutPage },
      { path: 'contact', name: 'contact', component: ContactPage },
    ],
  },

  // ---- Admin panel ----
  { path: '/admin/login', name: 'admin-login', component: AdminLogin },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      { path: '', name: 'admin-dashboard', component: AdminDashboard },
      { path: 'products', name: 'admin-products', component: AdminProducts },
      { path: 'orders', name: 'admin-orders', component: AdminOrders },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// Simple admin protection (temporary, real login will come from Laravel)
router.beforeEach((to) => {
  if (to.meta.requiresAdmin && !localStorage.getItem('ms_admin')) {
    return { name: 'admin-login' }
  }
})

export default router
