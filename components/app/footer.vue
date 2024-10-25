<script setup lang="ts">

const socialLinks = [
  {
    label: "Feed",
    to: "/atom.xml",
  },
  {
    label: "GitLab",
    to: "https://gitlab.com/HanKruiger",
  },
  {
    label: "GitHub",
    to: "https://github.com/HanKruiger",
  },
  {
    label: "Mastodon",
    to: "https://mastodon.nl/@hankruiger",
    rel: "me",
  },
  {
    label: "LinkedIn",
    to: "https://www.linkedin.com/in/hankruiger/",
  },
];

const year = new Date().getFullYear();

</script>

<template>
  <footer class="flex flex-col gap-8 py-4 items-center bg-slate-300 dark:bg-slate-800 border-t border-gray-200 dark:border-gray-800">
    <div class="flex flex-row max-w-lg w-full flex-wrap gap-6">
      <ULink v-for="link in socialLinks" class="flex-1 font-medium underline">
        {{ link.label }}
      </ULink>
    </div>
    <aside>
      <p>
        Want to fix a typo? <ULink to="https://github.com/HanKruiger/hankruiger.com/issues" class="font-medium underline">Let me know!</ULink>
      </p>
    </aside>
    <aside>
      <p>
        &copy; {{ year }} Han Kruiger
      </p>
    </aside>
  </footer>
</template>
