<script setup lang="ts">
import startDemo from "behave_blog_demo";

function start() {
  startDemo();
}

</script>

<template>
  <UButton @click="start" icon="lucide:download">Start the demo (XX MB)</UButton>
</template>
