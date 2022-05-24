<script setup>
import { computed, onMounted, onUpdated } from 'vue'
import { useCurrencyStore } from '../stores/currency'
import { useGoodsStore } from '../stores/goods'
import { useCartStore } from '../stores/cart'

const props = defineProps({ id: Number })

const goodsStore = useGoodsStore()
const currencyStore = useCurrencyStore()
const cartStore = useCartStore()

onMounted (() => {
  setGoodCost()
})

onUpdated (() => {
  setGoodCost()
})

const goodItem = computed(() => {
  try {
    return goodsStore.goodById(props.id)
  } catch (e) {
    return {}
  }
})

const price = computed(() => {
  try {
    return (goodItem.value.price * currencyStore.getCurrentUSD).toFixed(2)
  } catch (e) {
    return 0
  }
})

const cost = computed(() => {
  try {
    return (goodItem.value.price * currencyStore.getCurrentUSD * cartStore.getGoodQuantity(props.id)).toFixed(2)
  } catch (e) {
    return 0
  }
})

function changeQuantity (newValue) {
  if (newValue > goodItem.value.count) cartStore.addGood(props.id, goodItem.value.count)
  else if (newValue < 1) cartStore.addGood(props.id, 1)
  setGoodCost()
}

function decrement () {
  cartStore.addGood(props.id, cartStore.getGoodQuantity(props.id) - 1)
  setGoodCost()
}

function increment () {
  cartStore.addGood(props.id, cartStore.getGoodQuantity(props.id) + 1)
  setGoodCost()
}

function removeGood () {
  cartStore.removeGood(props.id)
}

function setGoodCost () {
  cartStore.setGoodCost(props.id, cost.value)
}

</script>

<template>
  <tr>
    <td class="text-left">{{ goodItem.name }}</td>
    <td class="text-right">{{ price }}</td>
    <td class="text-left">
      <q-input
        v-model="cartStore.goods[props.id]"
        :rules="[ val => (val >=1 && val <= goodItem.count) ]"
        @update:model-value="changeQuantity"
        dense
        class="cart-qnt">
        <template v-slot:before>
          <q-btn :disable="cartStore.goods[props.id] <= 1" round dense flat icon="remove" @click="decrement" />
        </template>
        <template v-slot:after>
          <q-btn :disable="cartStore.goods[props.id] >= goodItem.count" round dense flat icon="add" @click="increment" />
        </template>
      </q-input>
    </td>
    <td class="text-right">{{ cost }}</td>
    <td class="text-right">
      <q-btn flat round icon="delete" @click="removeGood()" />
    </td>
  </tr>
</template>

<style>
  .cart-qnt {
    width: 130px;
  }
  .cart-qnt input {
    text-align: center;
  }
</style>
