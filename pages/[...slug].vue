<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(
  `page-${route.path}`,
  () => queryContent(route.path).findOne()
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

function ensureTrailingSlash(path: string) {
  if (path.endsWith('/')) return path;
  return path + '/';
}

const showContentList = computed(() => {
  return page.value?._stem.endsWith('/index');
});

</script>

<template>
  <article class="prose md:prose-xl dark:prose-invert">
    <h1 v-if="!page!.hideTitle">{{ page!.title }}</h1>
    <ContentDoc />
  </article>
  <ContentList v-if="showContentList" :path="ensureTrailingSlash(route.path)" v-slot="{ list }">
    <div class="flex flex-col gap-4">
      <ULink v-for="post in list" :to="post._path">
        <UCard>
          <span class="underline font-bold">
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
