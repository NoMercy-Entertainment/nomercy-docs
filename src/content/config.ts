import { defineCollection, z } from "astro:content";

const docsCollection = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      published: z.date().optional(),
      updated: z.date().optional(),
      tags: z.array(z.string()).optional(),
      author: z.string().optional(),
      category: z.string().optional(),
      order: z.number().optional(),
      draft: z.boolean().optional().default(false),
      sections: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            tag: z.string().optional(),
          }),
        )
        .optional(),
    })
    .catchall(z.any()), // Allow any additional fields to pass through for debugging
});

export const collections = {
  docs: docsCollection,
  app: docsCollection,
  mediaserver: docsCollection,
  player: docsCollection,
};
