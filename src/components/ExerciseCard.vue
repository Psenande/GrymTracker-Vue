<template>
  <article class="border rounded p-3 bg-white">
    <h3 class="font-medium">{{ exercise.name }}</h3>
    <p class="text-sm text-slate-600">{{ exercise.description }}</p>
  </article>
</template>

<script setup>
defineProps({ exercise: { type: Object, required: true } })
</script>
