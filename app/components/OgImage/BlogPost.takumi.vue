<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
  title: string;
  author: string;
  date?: string;
  description?: string;
}>();

const formattedDate = computed(() => props.date ? dayjs(props.date).format("MMMM D, YYYY") : undefined);
</script>

<template>
  <div
    class="w-full h-full flex flex-col p-[60px] justify-between text-white"
    style="background: linear-gradient(135deg, #0f172a 0%, #4c1d95 50%, #0c4a6e 100%);"
  >
    <div class="flex flex-col gap-6">
      <h1
        class="text-[80px] font-extrabold m-0"
        style="line-height: 1.1;"
      >
        {{ title }}
      </h1>
      <p v-if="description" class="text-[32px] text-neutral-300 m-0">{{ description }}</p>
    </div>

    <div class="flex items-center gap-6">
      <div class="flex flex-col">
        <span class="text-[32px] font-semibold">{{ author }}</span>
        <span v-if="formattedDate" class="text-[24px] text-neutral-400">{{ formattedDate }}</span>
      </div>
    </div>
  </div>
</template>
