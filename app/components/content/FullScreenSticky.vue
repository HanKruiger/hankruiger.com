<template>
  <ClientOnly>
    <Teleport to="#full-screen-stickies">
      <div class="absolute">
        <slot />
      </div>
    </Teleport>
  </ClientOnly>
</template>
