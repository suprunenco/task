<script setup>
import { computed, onMounted, ref } from 'vue'
import { useCurrencyStore } from '../stores/currency'

const currencyStore = useCurrencyStore()

const currencySrc = ref('cbr')
const manualCurrency = ref(20)

onMounted (() => {
  currencyStore.loadCurrency()
  if (currencyStore.manualCurrency) {
    currencySrc.value = 'manual'
    currencyStore.setUSD(manualCurrency.value)
  } else {
    currencySrc.value = 'cbr'
    currencyStore.setUSD(currencyStore.getUSD)
  }
})

function chooseCurrencyMode (value) {
  if (value === 'manual') {
    currencyStore.manualCurrency = true
    currencyStore.setUSD(manualCurrency.value)
  } else {
    currencyStore.manualCurrency = false
    currencyStore.setUSD(currencyStore.getUSD)
  }
}

function changeCurrencyValue (value) {
  currencyStore.setUSD(value)
}

const usdToFixed = computed(() => {
  try {
    return currencyStore.getUSD
  } catch (e) {
    return 0
  }
})
</script>

<template>
  <label>{{ $t('currencySrc') }}</label>
  <q-list>
    <q-item tag="label">
      <q-item-section avatar>
        <q-radio
          v-model="currencySrc"
          val="cbr"
          @update:model-value="chooseCurrencyMode" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ $t('cbrCurrency') + ': ' + usdToFixed + '&nbsp;₽' }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item tag="label">
      <q-item-section avatar>
        <q-radio
          v-model="currencySrc"
          val="manual"
          @update:model-value="chooseCurrencyMode">
        </q-radio>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ $t('manualCurrency') + ': ' + manualCurrency + '&nbsp;₽' }}
          <q-slider
            v-model="manualCurrency"
            :disable="currencySrc !== 'manual'"
            :readonly="currencySrc !== 'manual'"
            :min="20"
            :max="80"
            @update:model-value="changeCurrencyValue" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
