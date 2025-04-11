<script setup lang="ts">
const opacity = ref(0.25);

const behaveDemoStore = useBehaveDemoStore();
const { demoStarted } = storeToRefs(behaveDemoStore);

onMounted(() => {
  demoStarted.value = false;
})

</script>

<template>
  <canvas id="behave-demo-canvas" ref="canvas"></canvas>
  <Teleport to="#full-screen-controls">
    <div
      v-show="demoStarted"
      class="flex flex-row w-fit items-center h-fit rounded-md p-2 dark:bg-neutral-800 bg-neutral-300 gap-3"
    >
      <div class="flex flex-col gap-1 h-full justify-between items-center">
        <USlider
          title="Adjust demo opacity"
          orientation="vertical"
          :min="0.0"
          :max="1.0"
          :step="0.01"
          class="h-25"
          v-model="opacity"
        />
        <UButton id="spawn-agent-toolbar" title="Spawn agent" icon="lucide:user-plus" />
      </div>
      <div class="flex flex-col gap-1 h-full items-stretch justify-between">
        <UButton id="move-hunger-based-toolbar" title="Enable hunger-based targeting" icon="lucide:brain" />
        <UButton id="move-to-fruit-toolbar" title="Enable walk to nearby fruit" icon="lucide:cherry" />
        <UButton id="walk-clockwise-toolbar" title="Enable clockwise walk" icon="lucide:repeat-2" />
        <UButton id="walk-lr-toolbar" title="Enable left-right walk" icon="lucide:arrow-left-right" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
canvas {
  opacity: v-bind("opacity");
}
</style>
