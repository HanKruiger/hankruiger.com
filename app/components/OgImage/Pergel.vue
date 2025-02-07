<script lang="ts" setup>
/**
 * Based on the Pergel template, but slightly modified to have
 * some other data in the image and have different visuals
 * 
 * @credits Pergel <https://nuxtlabs.com/>
 */

import dayjs from "dayjs";

const props = defineProps<{
  title: string,
  description: string,
  created?: string
}>();
  
const runtimeConfig = useRuntimeConfig();

const domain = computed(() => {
  const url = new URL(runtimeConfig.baseUrl);
  return url.hostname;
})

const title = computed(() => props.title.slice(0, 80))
</script>

<template>
  <div class="bg-[#af93c2aa]"></div>

  <div class="w-full h-full flex flex-col justify-center bg-[#212121]">
    <svg class="absolute top-0 right-0" width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g style="mix-blend-mode:overlay" opacity="0.7" filter="url(#filter0_f_448_25)">
        <circle cx="901.5" cy="45.5" r="199.5" fill="#af93c2aa" />
        <circle cx="600.5" cy="416.5" r="199.5" fill="#72e4b1aa" />
        <circle cx="179.5" cy="317.5" r="199.5" fill="#73baeaaa" />
      </g>
      <defs>
        <filter id="filter0_f_448_25" x="-240" y="-374" width="1561" height="1111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="110" result="effect1_foregroundBlur_448_25" />
        </filter>
      </defs>
    </svg>

    <div class="w-[600px] pl-[100px]">
      <p v-if="domain" class="uppercase text-[24px] text-[#88f1ff] mb-4 font-semibold">
        {{ domain }}
      </p>
      <h1
        class="w-[600px] m-0 font-semibold mb-4 text-white flex items-center"
        :class="{
          'text-[50px]': title.length > 40,
          'text-[75px]': title.length <= 40,
        }"
      >
        <span>{{ title }}</span>
      </h1>
      <p class="text-[32px] text-[#E4E4E7] leading-tight">
        {{ description.slice(0, 200) }}
      </p>
    </div>
    <div v-if="created" class="self-end pr-10">
      <p class="uppercase text-[32px] text-[#88f1ff] mb-4 font-semibold">
        {{ dayjs(created).format('MMMM D, YYYY') }}
      </p>
    </div>
  </div>
</template>
