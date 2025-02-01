import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: '2.posts/*.md',
      schema: z.object({
        created: z.date(),
        updated: z.date().nullable(),
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: '*.md'
    })
  }
})
