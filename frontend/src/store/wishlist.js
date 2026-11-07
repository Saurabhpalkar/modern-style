import { reactive, watch } from 'vue'

function loadSavedWishlist() {
  const saved = localStorage.getItem('ms_wishlist')
  if (!saved) return []

  let ids
  try {
    ids = JSON.parse(saved)
  } catch (error) {
    localStorage.removeItem('ms_wishlist')
    console.warn('Invalid saved wishlist data was cleared.', error)
    return []
  }

  const valid = Array.isArray(ids) && ids.every((id) => Number.isInteger(id) && id > 0)
  if (!valid) {
    localStorage.removeItem('ms_wishlist')
    console.warn('Invalid saved wishlist data was cleared.')
    return []
  }
  return ids
}

const wishlistIds = reactive(new Set(loadSavedWishlist()))

watch(() => [...wishlistIds], (ids) => localStorage.setItem('ms_wishlist', JSON.stringify(ids)))

export function isWishlisted(id) {
  return wishlistIds.has(id)
}

export function toggleWishlist(id) {
  if (wishlistIds.has(id)) wishlistIds.delete(id)
  else wishlistIds.add(id)
}
