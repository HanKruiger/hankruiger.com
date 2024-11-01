<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content';

const route = useRoute()
const { data: page } = await useAsyncData(
  `page-${route.path}`,
  () => queryContent(route.path).findOne()
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const hideTitle = page.value.hideTitle;
const showContentList = page.value._stem.endsWith('/index');
const contentListQuery: QueryBuilderParams = {
  path: ensureTrailingSlash(route.path),
  sort: [{ created: -1 }]
}

// this makes it so that if you are on both `/posts/` and `/posts`
// you will not get the page `/posts` itself.
function ensureTrailingSlash(path: string) {
  if (path.endsWith('/')) return path;
  return path + '/';
}

</script>

<template>
  <article class="prose md:prose-xl dark:prose-invert">
    <h1 v-if="!hideTitle">{{ page!.title }}</h1>
    <ContentDoc />
  </article>
  <ContentList
    v-if="showContentList"
    :query="contentListQuery"
    v-slot="{ list }"
  >
    <div class="flex flex-col gap-4">
      <ULink v-for="post in list" :to="post._path">
        <UCard>
          <span class="underline font-medium text-xl">
            {{ post.title }}
          </span>
          <template #footer v-if="post.created">
            <span class="italic">{{ post.created }}</span>
          </template>
        </UCard>
      </ULink>
    </div>
  </ContentList>
</template>
