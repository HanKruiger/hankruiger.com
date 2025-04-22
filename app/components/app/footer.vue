<script setup lang="ts">

const socialLinks = [
  {
    label: "Feed",
    to: "/atom.xml",
  },
  {
    label: "GitLab",
    to: "https://gitlab.com/HanKruiger",
    target: "_blank",
  },
  {
    label: "GitHub",
    to: "https://github.com/HanKruiger",
    target: "_blank",
  },
  {
    label: "Mastodon",
    to: "https://mastodon.nl/@hankruiger",
    rel: "me",
    target: "_blank",
  },
  {
    label: "Bluesky",
    to: "https://bsky.app/profile/hankruiger.com",
    rel: "me",
    target: "_blank",
  },
];

const year = new Date().getFullYear();

</script>

<template>
  <footer class="flex flex-col gap-8 p-4 items-center bg-slate-300 dark:bg-slate-800 border-t border-gray-200 dark:border-gray-800">
    <div class="flex flex-row max-w-lg w-full flex-wrap gap-4 justify-around">
      <a v-for="link in socialLinks" :href="link.to" :rel="link.rel" :target="link.target" class="font-medium underline">
        {{ link.label }}
      </a>
    </div>
    <aside>
      <p>
        Want to fix a typo? <ULink to="https://github.com/HanKruiger/hankruiger.com/issues" target="_blank" class="font-medium underline">Let me know!</ULink>
      </p>
    </aside>
    <aside>
      <p>
        &copy; {{ year }} Han Kruiger
      </p>
    </aside>
  </footer>
</template>
