<script setup lang="ts">
defineProps<{label: string}>();
</script>

<template>
  <UButton>{{ label }}</UButton>
</template>
