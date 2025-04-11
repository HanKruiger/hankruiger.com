<script setup lang="ts">
import startDemo from "behave_blog_demo";

const behaveDemoStore = useBehaveDemoStore();
const { demoStarted } = storeToRefs(behaveDemoStore);

const loading = ref(false);

async function start() {
  loading.value = true;
  try {
    await startDemo();
  } catch (e: unknown) {
    if (!(e instanceof Error && e.message.includes("This isn't actually an error!"))) {
      // rethrow if it isn't the control flow exception what wasm-bindgen uses
      throw e;
    }
  } finally {
    loading.value = false;
  }
  demoStarted.value = true;
}

</script>

<template>
  <UButton :loading="loading" :disabled="demoStarted" @click="start" icon="lucide:download">Start the demo (12 MB)</UButton>
</template>
