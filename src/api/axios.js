import axios from 'axios'
import { useUserStore } from '../stores/user'

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost/api'
const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  try {
    const store = useUserStore()
    const token = store?.token?.value ?? store?.token
    if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
  } catch (e) {
    
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      try {
        const store = useUserStore()
        store.logout()
      } catch (e) {}
    }
    return Promise.reject(error)
  }
)

export default api
