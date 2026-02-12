<template>
  <section>
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <div class="text-center">
        <h2 class="text-xl font-semibold mb-4">Player</h2>
        <div class="text-3xl font-bold mb-4">{{ current?.name || '—' }}</div>
        <div class="flex gap-2 justify-center mb-4">
          <button @click="prev" class="px-3 py-1 border rounded">Prev</button>
          <button @click="next" class="px-3 py-1 border rounded">Next</button>
        </div>
        <div class="text-slate-600">{{ current?.instructions }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../../api/axios'

const route = useRoute()
const exercises = ref([])
const loading = ref(false)
const index = ref(0)

const current = computed(() => exercises.value[index.value] || null)

async function load() {
  loading.value = true
  try {
    const { data } = await api.get(`/routines/${route.params.id}`)
    exercises.value = data.exercises || data.items || data.routine_exercises || []
  } catch (e) { console.error(e) }
  loading.value = false
}

function next() { if (index.value < exercises.value.length - 1) index.value++ }
function prev() { if (index.value > 0) index.value-- }

onMounted(load)
</script>
