<!-- Home page = a stack of sections. Re-order or remove sections here. -->
<template>
  <HeroSection />
  <DepartmentShowcase />
  <BestSellers />
  <ProductPreviewCarousel />
  <FeaturesSection />
  <PriceBoard />
  <StoreBanner />
</template>

<script setup>
import HeroSection from '../../components/user/HeroSection.vue'
import DepartmentShowcase from '../../components/user/DepartmentShowcase.vue'
import BestSellers from '../../components/user/BestSellers.vue'
import ProductPreviewCarousel from '../../components/user/ProductPreviewCarousel.vue'
import FeaturesSection from '../../components/user/FeaturesSection.vue'
import PriceBoard from '../../components/user/PriceBoard.vue'
import StoreBanner from '../../components/user/StoreBanner.vue'
</script>
