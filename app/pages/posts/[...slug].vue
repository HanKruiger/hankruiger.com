<script setup lang="ts">
import dayjs from 'dayjs';

const route = useRoute()
const { data: page } = await useAsyncData('post-' + route.path, () => {
  return queryCollection('posts').path(route.path).first()
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
  <article v-if="page" class="prose md:prose-xl dark:prose-invert">
    <h1 v-if="page.path !== '/posts'">{{ page.title }}</h1>
    <p class="italic" v-if="page.created">Published: {{ dayjs(page.created).format('MMMM D, YYYY') }}.</p>
    <p class="italic" v-if="page.updated">This post was last updated {{ dayjs(page.updated).format('MMMM D, YYYY') }}.</p>
    <ContentRenderer v-if="page" :value="page" />
  </article>
</template>
