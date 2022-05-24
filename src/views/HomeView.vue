<script setup>
import Cart from '@/components/Cart.vue'
import Catalogue from '@/components/Catalogue.vue'
import CurrencyControl from '@/components/CurrencyControl.vue'
import LoadControl from '@/components/LoadControl.vue'
</script>

<template>
  <CurrencyControl/>
  <LoadControl />
  <Catalogue />
  <Cart />
  <Catalogue edit />
</template>
