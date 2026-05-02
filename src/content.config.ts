import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const homelab = defineCollection({
	loader: glob({ base: './src/content/homelab', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		/** Intro line under the title on the post page; also used as the excerpt on /homelab. */
		listSummary: z.string().optional(),
		/** Publication date shown in listings and `<time datetime>`. */
		published: z.coerce.date(),
		/** Bump when you revise the article; optional. Shown next to published when set. */
		updated: z.coerce.date().optional(),
	}),
});

const homelabSpecs = defineCollection({
	loader: glob({ base: './src/content/homelab-specs', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		/** Short line under the title on /homelab specs cards and optional intro on detail. */
		listSummary: z.string().optional(),
		/** Last time you revised this doc (shown on index + detail). Optional. */
		updated: z.coerce.date().optional(),
	}),
});

export const collections = { homelab, homelabSpecs };
