<template>
  <nav class="bg-white shadow px-4 py-3">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <div class="font-bold">GrymTracker</div>
      <div class="flex items-center gap-3">
        <router-link to="/" class="text-slate-700 hover:text-sky-600 border-b hover:border-slate-700 transition-colors duration-200">Inicio</router-link>
        <router-link to="/categories" class="text-slate-700 hover:text-sky-600">Categorías</router-link>
        <router-link to="/exercises" class="text-slate-700 hover:text-sky-600">Ejercicios</router-link>
        <router-link to="/routines" class="text-slate-700 hover:text-sky-600">Rutinas</router-link>
        <router-link v-if="isLogged" to="/my-routines" class="text-slate-700 hover:text-sky-600">Mis Rutinas</router-link>
        <router-link v-if="!isLogged" to="/register" class="text-slate-700 hover:text-sky-600">Registro</router-link>
      </div>
      <button v-if="!isLogged" @click="goLogin" class="text-sky-600 hover:text-sky-800">Entrar</button>
      <div v-else class="flex items-center gap-2">
        <span class="text-slate-700">
          {{ user?.name || user?.username || 'Usuario' }}
        </span>
        <button @click="logout" class="text-red-500 hover:text-red-700">Salir</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { computed } from 'vue'
import api from '../api/axios'

const router = useRouter()
const store = useUserStore()
const isLogged = computed(() => !!store.token)
const user = computed(() => store.user)

function goLogin() { router.push({ name: 'login' }) }
async function logout() {
  try {
    await api.post('/logout')
  } catch (e) {}
  store.logout();
  router.push({ name: 'home' })
}
</script>
