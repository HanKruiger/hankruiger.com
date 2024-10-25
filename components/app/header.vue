<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const route = useRoute();

const links = computed(() => {
  return navigation.value?.map(l => ({
    to: l._path,
    label: l.title,
    active: l._path == '/' ? route.path == '/' : route.path.startsWith(l._path),
  })) ?? [];
});

</script>

<template>
  <header class="flex flex-row-reverse flex-wrap p-1 items-center bg-slate-300 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-800">
    <ToggleDarkMode />
    <UHorizontalNavigation class="w-fit grow" :links="links" />
  </header>
</template>
