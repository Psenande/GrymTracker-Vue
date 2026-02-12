import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('gt_token') || '')
  const user = ref(JSON.parse(localStorage.getItem('gt_user') || 'null'))

  function setToken(t) {
    token.value = t
    localStorage.setItem('gt_token', t)
  }

  function setUser(u) {
    user.value = u
    localStorage.setItem('gt_user', JSON.stringify(u))
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('gt_token')
    localStorage.removeItem('gt_user')
  }

  return { token, user, setToken, setUser, logout }
})
