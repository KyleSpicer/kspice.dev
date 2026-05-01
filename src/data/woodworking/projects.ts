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
	{
		slug: 'walnut-box',
		title: 'Walnut keepsake box',
		description:
			'Hand-cut joinery and a simple oil finish. Replace the placeholder images in this folder with your build photos when you are ready.',
		details: [
			'Photos live in `public/images/woodworking/walnut-box/`. Swap `case-open.png`, `miter-detail.png`, and `finished.png` for your files (same names), or rename files and update the `src` fields below.',
		],
		completed: '2026-04-18',
		images: [
			{
				src: '/images/woodworking/walnut-box/case-open.png',
				alt: 'Box case open showing interior',
				caption: 'Case dry fit—lid off, checking gaps before glue-up.',
			},
			{
				src: '/images/woodworking/walnut-box/miter-detail.png',
				alt: 'Close-up of corner joinery',
				caption: 'Corner detail after first cleanup with the shooting board.',
			},
			{
				src: '/images/woodworking/walnut-box/finished.png',
				alt: 'Finished box on the bench',
				caption: 'Finished with oil; ready for lining or hardware.',
			},
		],
	},
	{
		slug: 'bench-hooks',
		title: 'French-cleat tool hooks',
		description:
			'Quick shop organization: matched cleats on the back of blocks and holders. Edit this blurb and the images to match your build.',
		completed: '2026-03-02',
		images: [
			{
				src: '/images/woodworking/bench-hooks/glue-up.png',
				alt: 'Hook blanks in clamps',
				caption: 'Gluing laminations for thicker hook stock.',
			},
			{
				src: '/images/woodworking/bench-hooks/hung.png',
				alt: 'Hooks on wall',
				caption: 'Hung on the cleat wall—adjust spacing as tools change.',
			},
		],
	},
];
