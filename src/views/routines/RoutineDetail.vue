<template>
  <section>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-2xl font-semibold">{{ routine?.name || 'Rutina' }}</h1>
        <p class="text-sm text-slate-600">{{ routine?.description }}</p>
      </div>
      <div class="flex gap-2">
        <router-link :to="{ name: 'routine-exercises', params: { id: route.params.id } }" class="px-3 py-1 border rounded">Ejercicios</router-link>
        <router-link :to="{ name: 'routine-player', params: { id: route.params.id } }" class="px-3 py-1 border rounded">Player</router-link>
      </div>
    </div>

    <router-view />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../../api/axios'

const route = useRoute()
const routine = ref(null)

async function load() {
  try {
    const { data } = await api.get(`/routines/${route.params.id}`)
    routine.value = data
  } catch (e) { console.error(e) }
}

onMounted(load)
</script>
