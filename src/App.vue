<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <NavBar />
    <main class="p-4 max-w-4xl mx-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>
