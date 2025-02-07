<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>();

type StatusCodeAnimal = 'cat' | 'dog';

const preferredAnimal = ref<StatusCodeAnimal>('cat')

const otherAnimal = computed(() => {
  if (preferredAnimal.value === 'cat') {
    return 'dog';
  } else {
    return 'cat';
  }
});

const toggle = () => {
  preferredAnimal.value = otherAnimal.value;
}

</script>

<template>
  <NuxtLayout>
    <div class="w-full h-full flex flex-col justify-center items-center gap-4">
      <img :src="`https://http.${preferredAnimal}/${error.statusCode}.jpg`">
      <UButton @click="toggle">I prefer {{ otherAnimal }}s</UButton>
    </div>
  </NuxtLayout>
</template>
