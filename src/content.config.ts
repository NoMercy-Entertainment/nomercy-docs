import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

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
  'nomercy-player-core': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/nomercy-player-core" }),
    schema: pageSchema,
  }),
  'nomercy-video-player': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/nomercy-video-player" }),
    schema: pageSchema,
  }),
  'nomercy-music-player': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/nomercy-music-player" }),
    schema: pageSchema,
  }),
  'nomercy-media-server': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/nomercy-media-server" }),
    schema: pageSchema,
  }),
  'nomercy-app-web': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/nomercy-app-web" }),
    schema: pageSchema,
  }),
  'nm-components': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/nm-components" }),
    schema: pageSchema,
  }),
  'nomercy-api': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/nomercy-api" }),
    schema: pageSchema,
  }),
};
