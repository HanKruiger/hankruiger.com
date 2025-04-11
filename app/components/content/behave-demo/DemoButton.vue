<script setup lang="ts">
const behaveDemoStore = useBehaveDemoStore();
const { demoStarted } = storeToRefs(behaveDemoStore);

</script>

<template>
  <UButton :disabled="!demoStarted" :title="!demoStarted ? 'Start the demo first.' : undefined"/>
</template>