// ===== API layer =====
// Catalog data is local for now; orders are sent to the configured Laravel API.
import { products } from '../data/products'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export async function getProducts() {
  return products
}

export async function getProduct(id) {
  return products.find((p) => p.id === Number(id))
}

export async function placeOrder(order) {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(order),
  })

  if (!response.ok) {
    throw new Error(`The shop server returned ${response.status}.`)
  }

  const result = await response.json()
  if (!result || typeof result.orderNumber !== 'string' || !result.orderNumber) {
    throw new Error('The shop server returned an invalid order confirmation.')
  }
  return result
}
