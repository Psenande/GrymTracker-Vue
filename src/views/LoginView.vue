<template>
  <section class="max-w-sm mx-auto">
    <h1 class="text-xl font-semibold mb-4">Login</h1>
    <form @submit.prevent="login" class="space-y-3">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" />
      <button class="w-full bg-sky-600 text-white p-2 rounded">Entrar</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const store = useUserStore()

async function login() {
  try {
    const { data } = await api.post('/login', { email: email.value, password: password.value })
    store.setToken(data.token)
    // Si el backend no devuelve user, puedes omitir esta línea o pedirlo aparte
    if (data.user) store.setUser(data.user)
    router.push({ name: 'home' })
  } catch (e) {
    alert('Error en login')
  }
}
</script>
