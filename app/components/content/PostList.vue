<script setup lang="ts">
import dayjs from "dayjs";

const route = useRoute();

const { data: posts } = await useAsyncData('posts-' + route.path, () => {
  return queryCollection('posts')
    .where('path', '<>', '/posts')
    .order('created', 'DESC')
    .all();
})

</script>

<template>
  <div class="not-prose">
    <nav>
      <ol>
        <li class="flex flex-col gap-4">
          <ULink v-for="post in posts" :to="post.path">
            <UCard>
              <div class="underline font-medium text-xl">
                {{ post.title }}
              </div>
              <template #footer>
                <span class="italic">{{ dayjs(post.created).format('MMMM D, YYYY') }}</span>
              </template>
            </UCard>
          </ULink>
        </li>
      </ol>
    </nav>
  </div>
</template>
