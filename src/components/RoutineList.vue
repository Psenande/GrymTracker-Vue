<template>
  <div class="space-y-2">
    <div v-for="r in routines" :key="r.id" class="p-3 bg-white border rounded">
      <h4 class="font-semibold">{{ r.name }}</h4>
      <p class="text-slate-600 text-sm">{{ r.notes }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ routines: { type: Array, default: () => [] } })
</script>
