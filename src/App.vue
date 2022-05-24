<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <q-layout view="hHh LpR fFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-space />
        <div id="header-aside" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="row justify-center">
          <div class="col-12 col-md-8 col-lg-6">
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<style>

</style>
