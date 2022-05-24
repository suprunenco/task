<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useGoodsStore } from '../stores/goods'

const goodsStore = useGoodsStore()

const autoLoad = ref(false)
let loadTimer = null

onMounted (() => {
  setLoader()
})

onUnmounted (() => {
  clearInterval(loadTimer)
})

function setLoader () {
  if (autoLoad.value) {
    loadTimer = setInterval(function () {
      goodsStore.loadGoods()
    }.bind(this), 15000)
  } else {
    clearInterval(loadTimer)
  }
}
</script>

<template>
  <q-checkbox
    v-model="autoLoad"
    :label="$t('loadEvery15Sec')"
    @update:model-value="setLoader" />
</template>
