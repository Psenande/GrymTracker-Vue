<template>
  <section>
    <h1 class="text-2xl font-semibold mb-4">Crear Rutina</h1>

    <div class="max-w-xl">
      <div class="mb-4">
        <label class="block text-sm">Nombre</label>
        <input v-model="name" class="w-full p-2 border rounded" />
      </div>

      <exercise-search @add="addExercise" />

      <div class="mt-4">
        <h2 class="font-semibold mb-2">Carrito</h2>
        <div v-if="cart.length===0" class="text-slate-600">Añade ejercicios desde el buscador.</div>
        <div v-else class="space-y-2">
          <div v-for="(it, idx) in cart" :key="it.exercise.id" class="p-3 bg-white border rounded">
            <div class="flex justify-between items-center">
              <div>
                <div class="font-medium">{{ it.exercise.name }}</div>
                <div class="text-sm text-slate-500">{{ it.exercise.instructions }}</div>
              </div>
              <div class="flex gap-2">
                <input type="number" v-model.number="it.sets" class="w-20 p-1 border rounded" placeholder="sets" />
                <input type="number" v-model.number="it.reps" class="w-20 p-1 border rounded" placeholder="reps" />
                <input type="number" v-model.number="it.rest_seconds" class="w-24 p-1 border rounded" placeholder="rest(s)" />
                <button @click="remove(idx)" class="text-red-600">Quitar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 flex gap-2">
        <button @click="save" class="bg-sky-600 text-white px-3 py-1 rounded">Guardar Rutina</button>
        <button @click="cancel" class="px-3 py-1 border rounded">Cancelar</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'
import ExerciseSearch from '../components/ExerciseSearch.vue'
import { useRouter } from 'vue-router'

const name = ref('')
const cart = ref([])
const router = useRouter()

function addExercise(ex) {
  if (cart.value.find(c => c.exercise.id === ex.id)) return
  cart.value.push({ exercise: ex, sets: 3, reps: 8, rest_seconds: 60 })
}

function remove(i) { cart.value.splice(i,1) }

async function save() {
  if (!name.value) return alert('Nombre requerido')
  const payload = {
    name: name.value,
    exercises: cart.value.map(c => ({ exerciseId: c.exercise.id, sets: c.sets, reps: c.reps, rest_seconds: c.rest_seconds }))
  }
  try {
    const { data } = await api.post('/routines', payload)
    router.push({ name: 'routine-detail', params: { id: data.id } })
  } catch (e) { alert('Error guardando') }
}

function cancel() { router.back() }
</script>
