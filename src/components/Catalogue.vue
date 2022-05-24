<script setup>
import GoodsCategory from '@/components/GoodsCategory.vue'

import { onMounted } from 'vue'
import { useGoodsStore } from '../stores/goods'

const props = defineProps({ edit: Boolean })

const goodsStore = useGoodsStore()

onMounted (() => {
  if (!props.edit) goodsStore.loadGoods()
})

function setCategoryName (id, name) {
  if (name.length) goodsStore.setCategoryName(id, name)
}

function setGoodName (categoryId, id, name) {
  if (name.length) goodsStore.setGoodName(categoryId, id, name)
}

function setGoodQnt (id, qnt) {
  if (qnt > 0) goodsStore.setGoodQnt(id, qnt)
}

function setGoodPrice (id, price) {
  if (price > 0 && typeof parseFloat(price) === 'number')
    goodsStore.setGoodPrice(id, price)
}
</script>

<template>
  <h4>{{ props.edit ? $t('editCatalogue') : $t('catalogue') }}</h4>
  <q-list>
    <GoodsCategory
      v-for="(category, id) in goodsStore.goodsByCategories"
      :key="id"
      :id="parseInt(id)"
      :name="category.name"
      :goods="category.goods"
      :edit="props.edit"
      @set-category-name="setCategoryName"
      @set-good-name="setGoodName"
      @set-good-qnt="setGoodQnt"
      @set-good-price="setGoodPrice" />
  </q-list>
</template>
