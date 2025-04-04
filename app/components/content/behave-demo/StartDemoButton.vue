<script setup lang="ts">
import wasm from "behave_blog_demo";

function start() {
  wasm();
}
</script>

<template>
  <UButton @click="start">Start the demo</UButton>
</template>
