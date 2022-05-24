<script setup>
import { computed, ref, watch } from 'vue'
import { useCartStore } from '../stores/cart'
import { useCurrencyStore } from '../stores/currency'

const props = defineProps({ id: Number, good: Object, edit: Boolean })
const emit = defineEmits(['setGoodName', 'setGoodQnt', 'setGoodPrice'])

const cartStore = useCartStore()
const currencyStore = useCurrencyStore()

const bgClass = ref('')

const buttonDisabled = computed(() => {
  try {
    return cartStore.getGoodQuantity(props.id) >= props.good.count
  } catch (e) {
    return false
  }
})

const price = computed(() => {
  try {
    return (props.good.price * currencyStore.getCurrentUSD).toFixed(2)
  } catch (e) {
    return 0
  }
})

watch (price, (newPrice, oldPrice) => {

  if (parseFloat(newPrice) > parseFloat(oldPrice)) bgClass.value = 'bg-red-1'
  else if (parseFloat(newPrice) < parseFloat(oldPrice)) bgClass.value = 'bg-green-1'
  else bgClass.value =  ''
})

function addToCart (goodId) {
  try {
    cartStore.addGood(goodId)
    return true
  } catch (e) {
    return false
  }
}

const nameToEdit = computed({
  get () {
    return props.good.name
  },
  set (newValue) {
    emit('setGoodName', props.id, newValue)
  }
})

const qntToEdit = computed({
  get () {
    return props.good.count
  },
  set (newValue) {
    emit('setGoodQnt', props.id, newValue)
  }
})

const priceToEdit = computed({
  get () {
    return props.good.price
  },
  set (newValue) {
    emit('setGoodPrice', props.id, newValue)
  }
})

</script>

<template>
  <q-item v-if="props.edit">
    <q-item-section>
      <q-input
        v-model="nameToEdit"
        :label="$t('name')"
        class="full-width"
        dense
        :rules="[ val => val.length >= 1 || $t('nonEmpty') ]"/>
    </q-item-section>
    <q-item-section side>
      <q-input
        v-model="qntToEdit"
        type="number"
        :label="$t('quantity')"
        dense
        :rules="[ val => val > 0 || $t('greaterThanZero') ]"/>
    </q-item-section>
    <q-item-section side>
      <q-input
        v-model="priceToEdit"
        :label="$t('priceUsd')"
        dense
        :rules="[ val => (typeof parseFloat(val) === 'number' && val > 0) || $t('floatGreaterThanZero') ]"/>
    </q-item-section>
  </q-item>
  <q-item
    v-else
    :class="bgClass">
    <q-item-section>
      <span class="text-weight-medium">
        {{ props.good.name }}
        <q-badge
          color="grey"
          text-color="white"
          :label="props.good.count + '&nbsp;' + $t('pcs')" />
      </span>
    </q-item-section>
    <q-item-section side>
      <span class="good-price">
        {{ price }}&nbsp;₽
      </span>
    </q-item-section>
    <q-item-section side>
      <q-btn
        flat
        round
        icon="add_shopping_cart"
        :disable="buttonDisabled"
        @click="addToCart(props.id)">
        <q-tooltip>{{ $t('addToCart') }}</q-tooltip>
      </q-btn>
    </q-item-section>
  </q-item>

</template>

<style scoped>
.good-price {
  font-size: 1.2rem;
}
</style>
