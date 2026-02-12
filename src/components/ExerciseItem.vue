<template>
  <div class="p-3 bg-white border rounded">
    <h4 class="font-semibold">{{ exercise.name }}</h4>
    <p class="text-sm text-slate-600 mt-1">{{ exercise.instructions }}</p>
  </div>
</template>

<script setup>
defineProps({ exercise: { type: Object, required: true } })
</script>
