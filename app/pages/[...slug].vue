<script setup lang="ts">
import dayjs from 'dayjs';
import { withoutTrailingSlash } from 'ufo';

const runtimeConfig = useRuntimeConfig();
const route = useRoute()

const { data: page } = await useAsyncData('page-' + withoutTrailingSlash(route.path), () => {
  return queryCollection('pages').path(withoutTrailingSlash(route.path)).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
  description: page.value?.description,
  ogUrl: `${runtimeConfig.public.baseUrl}${page.value.path}/`,
});

</script>

<template>
  <article class="prose md:prose-xl dark:prose-invert">
    <p class="italic" v-if="page?.meta.updated">This page was last updated {{ dayjs(page.meta.updated as string).format('MMMM D, YYYY') }}.</p>
    <ContentRenderer v-if="page" :value="page" />
  </article>
</template>
