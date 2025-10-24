<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Headernav from './components/headernav.vue'
const route = useRoute()

const showHeader = computed(() => {
  return route.name !== 'CountBookAPI'
})
</script>

<template>
  <div class="main-container bg-light min-vh-100">
    <header v-if="showHeader">
      <Headernav />
    </header>

    <main class="main-container py-4">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff, #ffffff);
}

nav.navbar {
  margin: 0;
  padding: 0;
}

main {
  flex: 1;
  padding-top: 2rem;
}
</style>
