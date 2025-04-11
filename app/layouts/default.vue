<template>
  <div class="flex flex-col h-full">
    <AppHeader />
    <main class="flex-[1_0_auto]">
      <div id="full-screen-stickies" class="sticky top-0 -z-10"></div>
      <div
        class="top-0 py-6 px-4 sm:px-0 mx-auto max-w-sm md:max-w-xl lg:max-w-2xl"
      >
        <slot />
      </div>
      <div
        id="full-screen-controls"
        class="sticky bottom-0 right-0 p-4 float-right"
      ></div>
    </main>
    <AppFooter />
  </div>
</template>
