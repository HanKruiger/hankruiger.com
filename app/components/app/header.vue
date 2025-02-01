<script setup lang="ts">
const router = useRouter();

const links = computed(() => [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/posts',
    label: 'Posts',
    active: router.currentRoute.value.path.startsWith('/posts')
  },
  {
    to: '/cv',
    label: 'CV'
  },
  {
    to: '/now',
    label: 'Now'
  },
]);

</script>

<template>
  <header class="flex flex-wrap py-1 px-2 items-center justify-center bg-slate-300 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-800">
    <UHorizontalNavigation class="w-fit grow justify-center" :links="links" />
    <ToggleDarkMode />
  </header>
</template>
