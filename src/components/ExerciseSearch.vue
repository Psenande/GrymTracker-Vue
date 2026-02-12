<template>
  <div class="p-3 bg-white border rounded mb-4">
    <div class="mb-2">
      <label class="block text-sm">Filtrar por categoría</label>
      <select v-model="categoryId" @change="loadExercises" class="w-full p-2 border rounded">
        <option value="">-- Selecciona --</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
    </div>

    <div v-if="loading">Cargando...</div>
    <div v-else class="space-y-2">
      <div v-for="e in exercises" :key="e.id" class="flex justify-between items-center">
        <div>
          <div class="font-medium">{{ e.name }}</div>
          <div class="text-sm text-slate-500">{{ e.instructions }}</div>
        </div>
        <div>
          <button @click="$emit('add', e)" class="bg-sky-600 text-white px-3 py-1 rounded">Añadir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const categories = ref([])
const exercises = ref([])
const categoryId = ref('')
const loading = ref(false)

async function loadCategories() {
  try {
    const { data } = await api.get('/categories')
    categories.value = data
  } catch (e) { console.error(e) }
}

async function loadExercises() {
  if (!categoryId.value) { exercises.value = []; return }
  loading.value = true
  try {
    const { data } = await api.get(`/categories/${categoryId.value}/exercises`)
    exercises.value = data
  } catch (e) { console.error(e) }
  loading.value = false
}

onMounted(loadCategories)
</script>
