<script setup>
import GoodsItemToCart from '@/components/GoodsItemToCart.vue'
import { onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

const cartStore = useCartStore()

onMounted (() => {
  cartStore.init()
})

function scrollToCart () {
  try {
    const el = document.getElementById('cart')
    setVerticalScrollPosition(getScrollTarget(el), el.offsetTop, 1000)
  } catch (e) {
    return false
  }
}

function clearCart () {
  cartStore.clearCart()
}
</script>

<template>
  <Teleport to="#header-aside">
    <q-btn dense flat round icon="shopping_cart" @click="scrollToCart()">
      <q-tooltip>{{ $t('scrollToCart') }}</q-tooltip>
    </q-btn>
  </Teleport>
  <div id="cart">
    <h4>{{ $t('cart') }}</h4>
    <q-markup-table
      v-if="Object.keys(cartStore.goods).length"
      flat>
      <thead>
        <tr>
          <th class="text-left">{{ $t('goodTitle') }}</th>
          <th class="text-right">{{ $t('price') }}</th>
          <th class="text-left">{{ $t('quantity') }}</th>
          <th class="text-right">{{ $t('cost') }}</th>
          <th class="text-right">{{ $t('remove') }}</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td class="text-left text-bold" colspan="2">{{ $t('total') }}</td>
          <td class="text-left text-bold">{{ cartStore.getTotalQuantity }}</td>
          <td class="text-right text-bold">{{ cartStore.getTotalCost }}</td>
          <td class="text-right">
            <q-btn flat round icon="delete_forever" @click="clearCart()">
              <q-tooltip>{{ $t('clearCart') }}</q-tooltip>
            </q-btn>
          </td>
        </tr>
      </tfoot>
      <tbody>
        <GoodsItemToCart
          v-for="(qnt, id) in cartStore.goods"
          :key="id"
          :id="parseInt(id)" />
      </tbody>
    </q-markup-table>
    <q-banner v-else
      class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="sentiment_very_dissatisfied" color="amber" />
      </template>
      {{ $t('emptyCartMessage') }}
    </q-banner>
  </div>
</template>
