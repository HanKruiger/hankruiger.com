<script setup lang="ts">
import dayjs from 'dayjs';

const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('pages').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const baseUrl = (process.env.ENV === 'production' ? process.env.URL : process.env.DEPLOY_PRIME_URL) || 'http://localhost:3000';

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
  description: page.value?.description,
  ogUrl: `${baseUrl}${page.value.path}/`,
});

</script>

<template>
  <article class="prose md:prose-xl dark:prose-invert">
    <p class="italic" v-if="page?.meta.updated">This page was last updated {{ dayjs(page.meta.updated as string).format('MMMM D, YYYY') }}.</p>
    <ContentRenderer v-if="page" :value="page" />
  </article>
</template>
