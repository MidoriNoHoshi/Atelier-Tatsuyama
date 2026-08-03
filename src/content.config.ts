import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      sub: z.string().optional(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      img: image().optional(),
      overlayImg: image().optional(), // <-- ADD THIS
      wordCount: z.number().optional(), // <-- ADD THIS
    }),
});

export const collections = { blog };
