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
  <header class="flex flex-wrap py-1 px-2 items-center justify-center bg-slate-300 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-800">
    <UHorizontalNavigation class="w-fit grow justify-center" :links="links" />
    <ToggleDarkMode />
  </header>
</template>
