const observer = typeof IntersectionObserver === 'undefined'
  ? null
  : new IntersectionObserver((entries, currentObserver) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-visible')
      currentObserver.unobserve(entry.target)
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })

export default {
  mounted(element) {
    if (!observer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-visible')
      return
    }
    element.classList.add('reveal')
    observer.observe(element)
  },
  unmounted(element) {
    if (observer) observer.unobserve(element)
  },
}
