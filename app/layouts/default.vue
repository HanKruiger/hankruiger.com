<template>
  <div class="flex flex-col h-full">
    <AppHeader/>
    <main class="flex-[1_0_auto] py-4 px-4 sm:px-0 mx-auto max-w-sm md:max-w-xl lg:max-w-2xl">
      <slot/>
    </main>
    <AppFooter/>
  </div>
</template>
