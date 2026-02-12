import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CategoryView from '../views/CategoryView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
  { path: '/exercises', name: 'exercises', component: () => import('../views/ExercisesView.vue') },
  { path: '/exercises/:id', name: 'exercise-detail', component: () => import('../views/ExerciseDetailView.vue') },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryView,
    children: [
      { path: '', name: 'categories-list', component: () => import('../views/categories/CategoryList.vue') },
      { path: 'create', name: 'category-create', component: () => import('../views/categories/CategoryCreate.vue') },
      { path: ':id', name: 'category-detail', component: () => import('../views/CategoryDetailView.vue') },
      { path: ':id/edit', name: 'category-edit', component: () => import('../views/categories/CategoryEdit.vue') }
    ]
  },
  { path: '/routines', name: 'routines', component: () => import('../views/RoutinesView.vue') },
  { path: '/routines/create', name: 'routine-create', component: () => import('../views/RoutineBuilder.vue') },
  {
    path: '/routines/:id',
    component: () => import('../views/routines/RoutineDetail.vue'),
    children: [
      { path: '', name: 'routine-detail', component: () => import('../views/routines/RoutineExercises.vue') },
      { path: 'exercises', name: 'routine-exercises', component: () => import('../views/routines/RoutineExercises.vue') },
      { path: 'player', name: 'routine-player', component: () => import('../views/routines/RoutinePlayer.vue') }
    ]
  },
  { path: '/my-routines', name: 'my-routines', component: () => import('../views/MyRoutinesView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
