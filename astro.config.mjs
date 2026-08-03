// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';

import tailwindcss from '@tailwindcss/vite';

import remarkObsidianCallouts from './src/lib/remark-obsidian-callouts.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],

  markdown: {
    // These apply to both .md and .mdx content, so writing in Obsidian
    // (GitHub-flavoured tables/strikethrough/task-lists + Obsidian-style
    // callouts) translates straight into the site's rendering.
    remarkPlugins: [remarkGfm, remarkObsidianCallouts],
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
