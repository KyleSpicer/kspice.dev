/**
 * Each project → /woodworking/<slug>/
 *
 * Save photos on disk under:
 *   public/images/woodworking/<slug>/<filename>
 * Reference them here as:
 *   /images/woodworking/<slug>/<filename>
 */
export interface WoodworkingImage {
	src: string;
	alt: string;
	/** Short line under the thumbnail and in the full-screen viewer. */
	caption: string;
}

export interface WoodworkingProject {
	slug: string;
	title: string;
	description: string;
	details?: readonly string[];
	completed?: string;
	images: readonly WoodworkingImage[];
}

export const woodworkingProjects: WoodworkingProject[] = [
	{
		slug: 'flag-alabama',
		title: 'Alabama flag piece',
		description:
			'Wooden Alabama flag accent—shown from the front and sides. Adjust the copy and captions in this file anytime.',
		completed: '2026-05-02',
		images: [
			{
				src: '/images/woodworking/flag-alabama/flag-alabama-front.jpg',
				alt: 'Alabama wooden flag wall piece, front view',
				caption: 'Front view.',
			},
			{
				src: '/images/woodworking/flag-alabama/flag-alabama-left.jpg',
				alt: 'Alabama wooden flag, left-angle view',
				caption: 'Left angle.',
			},
			{
				src: '/images/woodworking/flag-alabama/flag-alabama-right.jpg',
				alt: 'Alabama wooden flag, right-angle view',
				caption: 'Right angle.',
			},
		],
	},
];
