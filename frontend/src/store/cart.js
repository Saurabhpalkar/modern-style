// ===== Shopping cart (simple shared state, saved in the browser) =====
import { reactive, computed, watch } from 'vue'

function loadSavedCart() {
  const saved = localStorage.getItem('ms_cart')
  if (!saved) return []

  let items
  try {
    items = JSON.parse(saved)
  } catch (error) {
    localStorage.removeItem('ms_cart')
    console.warn('Invalid saved cart data was cleared.', error)
    return []
  }

  const valid = Array.isArray(items) && items.every((item) => (
    item !== null
    && typeof item === 'object'
    && Number.isInteger(item.id)
    && typeof item.name === 'string'
    && Number.isFinite(item.price)
    && typeof item.size === 'string'
    && Number.isInteger(item.qty)
    && item.qty > 0
  ))
  if (!valid) {
    localStorage.removeItem('ms_cart')
    console.warn('Invalid saved cart data was cleared.')
    return []
  }
  return items
}

// state.items = [{ id, name, price, image, size, qty }]
const state = reactive({ items: loadSavedCart() })

watch(() => state.items, (items) => localStorage.setItem('ms_cart', JSON.stringify(items)), { deep: true })

export const cartItems = computed(() => state.items)
export const cartCount = computed(() => state.items.reduce((n, i) => n + i.qty, 0))
export const cartTotal = computed(() => state.items.reduce((sum, i) => sum + i.price * i.qty, 0))

export function addToCart(product, size, qty = 1) {
  const existing = state.items.find((i) => i.id === product.id && i.size === size)
  if (existing) existing.qty += qty
  else state.items.push({ id: product.id, name: product.name, price: product.price, image: product.image, size, qty })
}

export function changeQty(item, qty) {
  item.qty = Math.max(1, qty)
}

export function removeFromCart(item) {
  state.items.splice(state.items.indexOf(item), 1)
}

export function clearCart() {
  state.items.splice(0)
}
