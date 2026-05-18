// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import path from "path";
import { fileURLToPath } from "url";

import { remarkPlugins } from "./src/lib/mdx/remark.ts";
import { rehypePlugins } from "./src/lib/mdx/rehype.ts";
import { recmaPlugins } from "./src/lib/mdx/recma.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react({
      include: ["**/react/**", "**/*.{tsx,jsx}"],
    }),
    mdx({
      remarkPlugins,
      rehypePlugins,
      recmaPlugins,
      optimize: true,
      // Disable Astro's rehypeShiki so it never sees ::button; we handle highlighting in rehype
      syntaxHighlight: false,
    }),
  ],
  markdown: {
    // Completely disable Shiki - we handle syntax highlighting in rehype
    syntaxHighlight: "prism",
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      // Ensure a single React instance to avoid "Invalid hook call" from duplicate React
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
    server: {
      watch: {
        // Use polling for WSL/network filesystems - helps with file change detection
        usePolling: true,
        interval: 1000,
      },
    },
  },
  server: {
    host: true, // Use 'true' instead of '0.0.0.0' - allows Astro to auto-detect the best host
    port: 4321,
    allowedHosts: true,
  },
});
