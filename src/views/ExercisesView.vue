<template>
  <section>
    <h1 class="text-2xl font-semibold mb-4">Ejercicios</h1>
    <div v-if="loading">Cargando...</div>
    <div v-else class="grid gap-3">
      <router-link v-for="ex in exercises" :key="ex.id" :to="{ name: 'exercise-detail', params: { id: ex.id } }" class="block p-3 bg-white border rounded hover:bg-slate-50">
        <div class="font-medium">{{ ex.name }}</div>
        <div class="text-sm text-slate-600">{{ ex.instructions }}</div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'
const exercises = ref([])
const loading = ref(false)
async function load() {
  loading.value = true
  try {
    const { data } = await api.get('/exercises')
    exercises.value = data
  } catch (e) { console.error(e) }
  loading.value = false
}
onMounted(load)
</script>
