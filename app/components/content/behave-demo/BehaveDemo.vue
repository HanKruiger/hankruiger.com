<script setup lang="ts">
const opacity = ref(0.3);
</script>

<template>
  <canvas id="behave-demo-canvas" ref="canvas"></canvas>
  <Teleport to="#full-screen-controls">
    <div
      class="flex flex-col w-fit h-fit rounded-md p-2 dark:bg-neutral-800 bg-neutral-300 gap-2"
    >
      <USlider
        title="Adjust demo opacity"
        orientation="vertical"
        :min="0.0"
        :max="1.0"
        :step="0.01"
        class="h-20"
        v-model="opacity"
      />
      <UButton id="spawn-agent-toolbar" title="Add agent" icon="lucide:user-plus" />
      <UButton title="Reset demo" icon="lucide:list-restart" />
    </div>
  </Teleport>
</template>

<style scoped>
canvas {
  opacity: v-bind("opacity");
}
</style>
