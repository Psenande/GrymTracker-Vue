<template>
  <section class="max-w-sm mx-auto">
    <h1 class="text-xl font-semibold mb-4">Registro</h1>
    <form @submit.prevent="register" class="space-y-3">
      <input v-model="name" type="text" placeholder="Nombre" class="w-full p-2 border rounded" />
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" />
      <button class="w-full bg-sky-600 text-white p-2 rounded">Registrarse</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'
const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
async function register() {
  try {
    await api.post('/register', { name: name.value, email: email.value, password: password.value })
    alert('Registro correcto, ahora puedes iniciar sesión')
    router.push({ name: 'login' })
  } catch (e) {
    alert('Error en registro')
  }
}
</script>
