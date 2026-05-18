import { defineCollection, z } from "astro:content";

const pageSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    published: z.date().optional(),
    updated: z.date().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
    helpKey: z.string().optional(),
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
  .catchall(z.any());

export const collections = {
  'nomercy-player-kit': defineCollection({ type: "content", schema: pageSchema }),
  'nomercy-video-player': defineCollection({ type: "content", schema: pageSchema }),
  'nomercy-music-player': defineCollection({ type: "content", schema: pageSchema }),
  'nomercy-media-server': defineCollection({ type: "content", schema: pageSchema }),
  'nomercy-app-web': defineCollection({ type: "content", schema: pageSchema }),
  'nomercy-app-android': defineCollection({ type: "content", schema: pageSchema }),
  'nomercy-api': defineCollection({ type: "content", schema: pageSchema }),
};
