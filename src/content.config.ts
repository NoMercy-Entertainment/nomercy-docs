import { defineCollection, z } from 'astro:content';

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  published: z.date().optional(),
  updated: z.date().optional(),
  draft: z.boolean().optional(),
  order: z.number().optional(),
  category: z.string().optional(),
});

const docs = defineCollection({ schema: pageSchema });
const app = defineCollection({ schema: pageSchema });
const mediaserver = defineCollection({ schema: pageSchema });
const player = defineCollection({ schema: pageSchema });

export const collections = {
  docs,
  app,
  mediaserver,
  player,
};
