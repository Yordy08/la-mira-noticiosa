<template>
  <div>
    <Navbar />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
</script>

<style scoped>
main {
  padding: 1rem;
}
</style>
