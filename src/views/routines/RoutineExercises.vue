<template>
  <section>
    <div v-if="loading">Cargando ejercicios...</div>
    <div v-else>
      <div v-if="exercises.length===0" class="text-slate-600">No hay ejercicios.</div>
      <div class="space-y-3">
        <div v-for="ex in exercises" :key="ex.id" class="p-3 bg-white border rounded flex justify-between items-start">
          <div>
            <h4 class="font-medium">{{ ex.name }}</h4>
            <p class="text-sm text-slate-600">{{ ex.instructions || ex.description }}</p>
            <div class="text-sm text-slate-500 mt-1">Sets: {{ ex.pivot?.sets || ex.sets || '-' }} · Reps: {{ ex.pivot?.reps || ex.reps || '-' }} · Rest: {{ ex.pivot?.rest_seconds || ex.rest_seconds || '-' }}s</div>
          </div>
          <div class="flex flex-col gap-2">
            <button @click="remove(ex)" class="text-red-600">Eliminar</button>
          </div>
        </div>
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

async function load() {
  loading.value = true
  try {
    const { data } = await api.get(`/routines/${route.params.id}`)
    // soporta data.exercises o data.items
    exercises.value = data.exercises || data.items || data.routine_exercises || []
  } catch (e) { console.error(e) }
  loading.value = false
}

async function remove(ex) {
  if (!confirm('Eliminar ejercicio de la rutina?')) return
  try {
    // Intentar endpoint RESTful; si no existe, la petición puede adaptarse
    await api.delete(`/routines/${route.params.id}/exercises/${ex.id}`)
    exercises.value = exercises.value.filter(e => e.id !== ex.id)
  } catch (e) {
    // Fallback: pedir al servidor actualizar la rutina completa (depende de la API)
    try {
      const remaining = exercises.value.filter(e => e.id !== ex.id).map(x => ({ exerciseId: x.id, sets: x.pivot?.sets, reps: x.pivot?.reps, rest_seconds: x.pivot?.rest_seconds }))
      await api.put(`/routines/${route.params.id}`, { exercises: remaining })
      exercises.value = exercises.value.filter(e => e.id !== ex.id)
    } catch (err) { alert('Error eliminando') }
  }
}

onMounted(load)
</script>
