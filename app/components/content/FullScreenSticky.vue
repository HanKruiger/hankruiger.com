<template>
  <ClientOnly>
    <Teleport to="#full-screen-stickies">
      <div class="absolute w-full h-screen">
        <slot />
      </div>
    </Teleport>
  </ClientOnly>
</template>
