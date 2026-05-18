import { defineCollection, z } from 'astro:content';

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  published: z.date().optional(),
  updated: z.date().optional(),
  draft: z.boolean().optional(),
  order: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  helpKey: z.string().optional(),
});

const nomercyPlayerKit = defineCollection({ schema: pageSchema });
const nomercyVideoPlayer = defineCollection({ schema: pageSchema });
const nomercyMusicPlayer = defineCollection({ schema: pageSchema });
const nomercyMediaServer = defineCollection({ schema: pageSchema });
const nomercyAppWeb = defineCollection({ schema: pageSchema });
const nomercyAppAndroid = defineCollection({ schema: pageSchema });
const nomercyApi = defineCollection({ schema: pageSchema });

export const collections = {
  'nomercy-player-kit': nomercyPlayerKit,
  'nomercy-video-player': nomercyVideoPlayer,
  'nomercy-music-player': nomercyMusicPlayer,
  'nomercy-media-server': nomercyMediaServer,
  'nomercy-app-web': nomercyAppWeb,
  'nomercy-app-android': nomercyAppAndroid,
  'nomercy-api': nomercyApi,
};
