import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    published: z.date().optional(),
    updated: z.date().optional(),
    draft: z.boolean().optional(),
    order: z.number().optional(),
    category: z.string().optional(),
  }),
});

export const collections = {
  docs,
};
