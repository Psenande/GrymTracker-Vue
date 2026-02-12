<template>
  <section class="max-w-md">
    <h2 class="text-xl font-semibold mb-3">Editar Categoría</h2>
    <form @submit.prevent="submit" class="space-y-3">
      <input v-model="name" placeholder="Nombre" class="w-full p-2 border rounded" />
      <input v-model="iconPath" placeholder="Icon path (URL o ruta)" class="w-full p-2 border rounded" />
      <div class="flex gap-2">
        <button class="bg-sky-600 text-white px-3 py-1 rounded">Guardar</button>
        <button type="button" @click="cancel" class="px-3 py-1 border rounded">Cancelar</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api/axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const name = ref('')
const iconPath = ref('')

async function load() {
  try {
    const { data } = await api.get(`/categories/${route.params.id}`)
    name.value = data.name
    iconPath.value = data.icon_path || data.iconPath || ''
  } catch (e) { console.error(e) }
}

async function submit() {
  try {
    await api.put(`/categories/${route.params.id}`, { name: name.value, icon_path: iconPath.value })
    router.push({ name: 'categories' })
  } catch (e) { alert('Error actualizando') }
}

function cancel() { router.back() }
onMounted(load)
</script>
