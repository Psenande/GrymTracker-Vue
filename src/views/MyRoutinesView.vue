<template>
  <section>
    <h1 class="text-2xl font-semibold mb-4">Mis Rutinas</h1>
    <div v-if="loading">Cargando...</div>
    <div v-else class="space-y-3">
      <div v-for="mr in myroutines" :key="mr.id" class="p-3 bg-white border rounded flex justify-between items-center">
        <div>
          <router-link
            v-if="(mr.routine && mr.routine.id) || mr.id"
            :to="{ name: 'routine-detail', params: { id: (mr.id) } }"
            class="font-medium"
          >
            {{ mr.name }}
          </router-link>
          <span v-else class="font-medium text-red-600">Rutina no disponible</span>
          <p class="text-sm text-slate-600">{{ mr.description }}</p>
        </div>
        <div class="flex gap-2">
          <button v-if="mr.routine && mr.routine.id" @click="view(mr.routine.id)" class="text-sky-600">Ver Detalle</button>
          <button @click="unsubscribe(mr.id)" class="text-red-600">Desuscribirse</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'

const myroutines = ref([])
const loading = ref(false)
const router = useRouter()

async function load() {
  loading.value = true
  try {
    const { data } = await api.get('/my-routines')
    myroutines.value = data
  } catch (e) { console.error(e) }
  loading.value = false
}

function view(id) { router.push({ name: 'routine-detail', params: { id } }) }

async function unsubscribe(id) {
  if (!confirm('Desuscribir?')) return
  try {
    await api.delete(`/my-routines/${id}`)
    myroutines.value = myroutines.value.filter(m => m.id !== id)
  } catch (e) { alert('Error') }
}

onMounted(load)
</script>
