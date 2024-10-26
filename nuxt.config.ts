// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-10-25',
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/tailwindcss'],

  routeRules: {
    '/': { prerender: true }
  },

  app: {
    head: {
      link: [
        { rel: 'shortcut icon', type: 'image/jpg', href: '/favicon.jpg' }
      ],
      htmlAttrs: {
        class: "h-full"
      },
      bodyAttrs: {
        class: "h-full"
      },
    },
    rootAttrs: {
      class: "h-full"
    }
  },

  content: {
    navigation: {
      fields: ['created'],
    },
    highlight: {
      theme: "one-dark-pro",
      langs: [
        'python',
        'sql',
        'json',
      ]
    }
  },
});
