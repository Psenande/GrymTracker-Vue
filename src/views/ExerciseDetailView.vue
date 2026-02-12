<template>
  <section>
    <router-link to="/exercises" class="text-slate-600">Volver</router-link>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="exercise">
      <h1 class="text-2xl font-semibold mb-2">{{ exercise.name }}</h1>
      <div class="text-slate-600 mb-2">{{ exercise.instruction }}</div>
    </div>
    <div v-else class="text-red-600">No encontrado</div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { useRoute } from 'vue-router'
const route = useRoute()
const exercise = ref(null)
const loading = ref(false)
async function load() {
  loading.value = true
  try {
    const { data } = await api.get(`/exercises/${route.params.id}`)
    exercise.value = data
  } catch (e) { exercise.value = null }
  loading.value = false
}
onMounted(load)
</script>
