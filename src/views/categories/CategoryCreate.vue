<template>
  <section class="max-w-md">
    <h2 class="text-xl font-semibold mb-3">Crear Categoría</h2>
    <form @submit.prevent="submit" class="space-y-3">
      <input v-model="name" placeholder="Nombre" class="w-full p-2 border rounded" />
      <input v-model="iconPath" placeholder="Icon path (URL o ruta)" class="w-full p-2 border rounded" />
      <div class="flex gap-2">
        <button class="bg-sky-600 text-white px-3 py-1 rounded">Crear</button>
        <button type="button" @click="cancel" class="px-3 py-1 border rounded">Cancelar</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import api from '../../api/axios'
import { useRouter } from 'vue-router'

const name = ref('')
const iconPath = ref('')
const router = useRouter()

async function submit() {
  try {
    await api.post('/categories', { name: name.value, icon_path: iconPath.value })
    router.push({ name: 'categories' })
  } catch (e) { alert('Error creando') }
}
function cancel() { router.back() }
</script>
