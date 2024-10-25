<script setup lang="ts">

const { data: posts } = await useAsyncData('posts',
  () => queryContent('/posts/')
    .sort({_stem: -1})
    .find()
);

const links = computed(() => {
  return posts.value?.map(p => ({
    to: p._path,
    label: p.title
  })) ?? [];
});

</script>

<template>
  <Content/>
  <nav class="flex flex-col gap-4">
    <ULink v-for="post in posts" :to="post._path">
      <UCard>
        <span class="underline font-bold">
          {{ post.title }}
        </span>
        <template #footer v-if="post.created">
          <div class="flex flex-row w-full justify-end">
            <span class="">{{ post.created }}</span>
          </div>
        </template>
      </UCard>
    </ULink>
  </nav>
  <!-- <pre>{{ posts }}</pre> -->
</template>
