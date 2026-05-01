/**
 * Document builds here: each project becomes /woodworking/<slug>/ on the site.
 *
 * Photos: put files under `public/images/woodworking/<slug>/…` then reference paths
 * from the site root below (e.g. `/images/woodworking/workbench/joint-detail.jpg`).
 */
export interface WoodworkingImage {
	src: string;
	alt: string;
	/** Short line shown under the thumbnail and in the full-screen viewer. */
	caption: string;
}

export interface WoodworkingProject {
	slug: string;
	title: string;
	/** Shown under the title on both the listing and detail page (summary / story). */
	description: string;
	/** Extra paragraphs shown on the detail page only (optional). */
	details?: readonly string[];
	/** Optional ISO date shown on the listing and detail pages. */
	completed?: string;
	images: readonly WoodworkingImage[];
}

export const woodworkingProjects: WoodworkingProject[] = [
	{
		slug: 'gallery-structure-example',
		title: 'How this woodworking section works',
		description:
			'Duplicate or edit rows in projects.ts for each real build: set slug, title, story text, then list images with alt text (for accessibility and search) and captions (what visitors see).',
		details: [
			'On each project page, clicks open photos in an in-page full-screen viewer.',
			'When you replace this starter entry, drop your files under `public/images/woodworking/<slug>/`.',
		],
		completed: '2026-05-01',
		images: [
			{
				src: '/images/logo/KSPICE.DEV-Logo-01.png',
				alt: 'Temporary placeholder graphic',
				caption:
					'Placeholder using the site mark—swap this for shop photos once files are under public/images/woodworking/',
			},
		],
	},
];
