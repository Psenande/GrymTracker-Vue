<template>
  <section>
    <h1 class="text-2xl font-semibold mb-4">Rutinas</h1>
    <div v-if="loading">Cargando...</div>
    <div v-else class="space-y-3">
      <div v-for="r in routines" :key="r.id" class="p-3 bg-white border rounded flex justify-between items-center">
        <div>
          <router-link :to="{ name: 'routine-detail', params: { id: r.id } }" class="font-medium">{{ r.name }}</router-link>
          <p class="text-sm text-slate-600">{{ r.description }}</p>
        </div>
        <div>
          <button v-if="isLogged && !myRoutineIds.includes(r.id)" @click="subscribe(r.id)" 
          class="bg-sky-600 text-white px-3 py-1 rounded">
          Suscribirse
        </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../api/axios'
import { useUserStore } from '../stores/user'

const routines = ref([])
const loading = ref(false)
const store = useUserStore()
const isLogged = computed(() => !!store.token)
const myRoutineIds = ref([])

async function load() {
  loading.value = true
  try {
    const [routinesRes, myRoutinesRes] = await Promise.all([
      api.get('/routines'),
      isLogged.value ? api.get('/my-routines') : Promise.resolve({ data: [] })
    ])
    routines.value = routinesRes.data
    myRoutineIds.value = (myRoutinesRes.data).map(mr => (mr.id))
  } catch (e) { console.error(e) }
  loading.value = false
}

async function subscribe(id) {
  try {
    await api.post('/my-routines', { routine_id: id })
    alert('Suscrito')
    myRoutineIds.value.push(id)
  } catch (e) { alert('Error suscribiendo') }
}

onMounted(load)
</script>
