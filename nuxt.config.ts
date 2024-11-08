const umamiWebsiteId = process.env['UMAMI_WEBSITE_ID'];

const productionScripts = [];
if (umamiWebsiteId) {
  productionScripts.push({
    async: true,
    src: 'https://analytics.umami.is/script.js',
    'data-website-id': umamiWebsiteId,
  });
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-10-25',
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/tailwindcss'],

  routeRules: {
    '/': { prerender: true },

    // `/about` no longer exists; redirects to `/`
    '/about': { redirect: '/' },
  },

  app: {
    head: {
      link: [
        { rel: 'shortcut icon', type: 'image/jpg', href: '/favicon.jpg' },
        { rel: 'alternate', type: 'application/atom+xml', title: 'Feed', href: '/atom.xml'},
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

  $production: {
    app: {
      head: {
        script: productionScripts
      }
    }
  },

  nitro: {
    prerender: {
      routes: ['/atom.xml']
    }
  }
});
