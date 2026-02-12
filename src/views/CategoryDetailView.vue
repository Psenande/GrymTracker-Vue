<template>
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-medium">Ejercicios de la categoría</h2>
      <router-link to="/categories" class="text-slate-600">Volver</router-link>
    </div>

    <div v-if="loading">Cargando...</div>
    <div v-else>
      <div class="grid gap-3">
        <ExerciseItem v-for="e in exercises" :key="e.id" :exercise="e" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api/axios'
import ExerciseItem from '../components/ExerciseItem.vue'

const route = useRoute()
const exercises = ref([])
const loading = ref(false)

async function load() {
  loading.value = true
  try {
    const { data } = await api.get(`/categories/${route.params.id}/exercises`)
    exercises.value = data
  } catch (e) { console.error(e) }
  loading.value = false
}

onMounted(load)
</script>

