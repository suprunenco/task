<script setup>
import { computed } from 'vue'
import GoodsItem from '@/components/GoodsItem.vue'

const props = defineProps({ id: Number, name: String, goods: Object, edit: Boolean })

const emit = defineEmits(['setCategoryName', 'setGoodName', 'setGoodQnt', 'setGoodPrice'])

const nameToEdit = computed({
  get () {
    return props.name
  },
  set (newValue) {
    emit('setCategoryName', props.id, newValue)
  }
})
</script>

<template>
  <q-expansion-item
    v-if="props.edit"
    expand-separator
    default-opened>
    <template v-slot:header>
      <q-input
        v-model="nameToEdit"
        :label="$t('name')"
        @click="evt => evt.stopPropagation()"
        class="full-width"
        dense
        :rules="[ val => val.length >= 1 || $t('nonEmpty') ]"/>
    </template>
    <GoodsItem
      edit
      v-for="(good, id) in props.goods"
      :key="id"
      :id="parseInt(id)"
      :good="good"
      @set-good-name="(id, name) => $emit('setGoodName', props.id, id, name)"
      @set-good-qnt="(id, qnt) => $emit('setGoodQnt', id, qnt)"
      @set-good-price="(id, price) => $emit('setGoodPrice', id, price)" />
  </q-expansion-item>
  <q-expansion-item
    v-else
    :label="props.name"
    header-class="list-header"
    expand-separator
    default-opened>
    <GoodsItem
      v-for="(good, id) in props.goods"
      :key="id"
      :id="parseInt(id)"
      :good="good" />
  </q-expansion-item>
</template>

<style>
.list-header {
  font-weight: bold;
}
</style>
