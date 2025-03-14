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
          <!--suppress HtmlUnknownTarget -->
          <ULink v-for="post in posts" :to="post.path">
            <UCard class="bg-(--ui-bg-elevated) divide-(--ui-border)">
              <template #header>
                <div class="underline font-medium text-xl text-(--ui-text)">
                  {{ post.title }}
                </div>
              </template>
              <template #footer>
                <span class="italic text-base">{{ dayjs(post.created).format('MMMM D, YYYY') }}</span>
              </template>
            </UCard>
          </ULink>
        </li>
      </ol>
    </nav>
  </div>
</template>
