<script setup lang="ts">

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ?  `${titleChunk} | Han` : 'Han';
  },
});

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
