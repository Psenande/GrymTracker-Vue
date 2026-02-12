<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Categorías</h1>
      <router-link v-if="isLogged" to="/categories/create" class="bg-sky-600 text-white px-3 py-1 rounded">Crear</router-link>
    </div>

    <div class="grid gap-3">
      <div v-for="cat in categories" :key="cat.id" class="p-3 bg-white border rounded flex justify-between items-center">
        <div class="flex items-center gap-3">
          <img v-if="cat.icon_path || cat.iconPath" :src="cat.icon_path || cat.iconPath" alt="icon" class="w-10 h-10 object-contain" />
          <div>
            <router-link v-if="isLogged" :to="{ name: 'category-detail', params: { id: cat.id } }" class="font-medium text-slate-800">{{ cat.name }}</router-link>
            <span v-else class="font-medium text-slate-800">{{ cat.name }}</span>
            <p v-if="cat.description" class="text-sm text-slate-600">{{ cat.description }}</p>
          </div>
        </div>
        <div class="flex gap-2" v-if="isLogged">
          <router-link :to="{ name: 'category-edit', params: { id: cat.id } }" class="text-sky-600">Editar</router-link>
          <button @click="remove(cat.id)" class="text-red-600">Borrar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../api/axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const categories = ref([])
const router = useRouter()
const store = useUserStore()
const isLogged = computed(() => !!store.token)

async function load() {
  try {
    const { data } = await api.get('/categories')
    categories.value = data
  } catch (e) { console.error(e) }
}

async function remove(id) {
  if (!confirm('Borrar categoría?')) return
  try {
    await api.delete(`/categories/${id}`)
    categories.value = categories.value.filter(c => c.id !== id)
  } catch (e) { alert('Error borrando') }
}

onMounted(load)
</script>
