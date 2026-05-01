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
	/** Small image on project list cards. If omitted, the first gallery image is used when available. */
	listThumbnail?: { src: string; alt: string };
	/** If set, shown on the /woodworking index card instead of `description` (detail page still uses `description`). */
	listSummary?: string;
	images: readonly WoodworkingImage[];
}

export const woodworkingProjects: WoodworkingProject[] = [
	{
		slug: 'cutting-board',
		title: 'First cutting board',
		description:
			'Hardwood cutting board. Cut down, glued up, planed, and CNC-carved.',
		listSummary: 'first cutting board from scratch.',
		completed: '2026-05-26',
		listThumbnail: {
			src: '/images/woodworking/cutting-board/finished.jpg',
			alt: 'Finished hardwood cutting board',
		},
		images: [
			{
				src: '/images/woodworking/cutting-board/finished.jpg',
				alt: 'Finished hardwood cutting board',
				caption: 'Finished board.',
			},
			{
				src: '/images/woodworking/cutting-board/cutting-board-glue-up.jpg',
				alt: 'Cutting board during glue-up',
				caption: 'Glue-up.',
			},
			{
				src: '/images/woodworking/cutting-board/cutting-board-glue-up-2.jpg',
				alt: 'Cutting board glue-up, second stage',
				caption: 'Glue-up (continued).',
			},
			{
				src: '/images/woodworking/cutting-board/cutting-board-glue-up-3.jpg',
				alt: 'Cutting board glue-up, third stage',
				caption: 'Glue-up (final clamp).',
			},
			{
				src: '/images/woodworking/cutting-board/cutting-board-after-plane.jpg',
				alt: 'Cutting board after planing',
				caption: 'After the planer.',
			},
			{
				src: '/images/woodworking/cutting-board/cutting-board-cnc-close-up.jpg',
				alt: 'CNC carving close-up on cutting board',
				caption: 'CNC detail.',
			},
			{
				src: '/images/woodworking/cutting-board/finished-top.jpg',
				alt: 'Finished cutting board, top view',
				caption: 'Top view.',
			},
		],
	},
	{
		slug: '170d-wobc-graduation-gifts',
		title: '170D WOBC speaker and instructor gifts',
		description:
			'Desk book holders for the guest speaker and main instructor of our 170D Warrant Officer Basic Course',
		listSummary: 'October 2023 170D WOBC Speaker and Instructor gifts.',
		completed: '2026-05-25',
		listThumbnail: {
			src: '/images/woodworking/170D-wobc-graduation-gifts/instructor-plaques.jpg',
			alt: 'Desk book holders and plaques for WOBC instructors',
		},
		images: [
			{
				src: '/images/woodworking/170D-wobc-graduation-gifts/instructor-plaques.jpg',
				alt: 'Instructor plaques and desk book holders',
				caption: 'Instructor plaques.',
			},
			{
				src: '/images/woodworking/170D-wobc-graduation-gifts/speaker-gifts-left.jpg',
				alt: '170D WOBC speaker gifts, left view',
				caption: 'Speaker gifts, left angle.',
			},
			{
				src: '/images/woodworking/170D-wobc-graduation-gifts/speaker-gifts-right.jpg',
				alt: '170D WOBC speaker gifts, right view',
				caption: 'Speaker gifts, right angle.',
			},
		],
	},
	{
		slug: 'tattoo-eagle',
		title: 'Eagle tattoo CNC plaque',
		description:
			"Tyson drew this original stencil and I picked it off his wall. Kept the stencil, converted it to a .stl, and used the CNC to create two plaques. I kept one and gifted him the other.",
		listSummary:
			"Used Tyson's original stencil to create an awesome CNC plaque of the tatoo.",
		completed: '2026-05-24',
		listThumbnail: {
			src: '/images/woodworking/tattoo-eagle/eagle-plaque.jpg',
			alt: 'CNC-carved wooden eagle plaque from tattoo stencil',
		},
		images: [
			{
				src: '/images/woodworking/tattoo-eagle/eagle-plaque.jpg',
				alt: 'CNC-carved wooden eagle plaque',
				caption: 'Finished eagle plaque.',
			},
			{
				src: '/images/woodworking/tattoo-eagle/eagle-tattoo-stencil.jpg',
				alt: "Tyson's original eagle stencil",
				caption: 'Original stencil from the wall.',
			},
			{
				src: '/images/woodworking/tattoo-eagle/eagle-tatoo.jpg',
				alt: 'Eagle tattoo reference photo',
				caption: 'Tattoo reference.',
			},
			{
				src: '/images/woodworking/tattoo-eagle/tyson-and-I.jpg',
				alt: 'Tyson and Kyle with the plaque',
				caption: 'Tyson and I.',
			},
		],
	},
	{
		slug: 'coin-rack-hd',
		title: 'Harley Davidson poker chip rack',
		description:
			'Wall-mounted coin rack for Harley Davidson Poker Chips. Common board.',
		listSummary: 'Wall-mounted coin rack for Harley Davidson Poker chips.',
		completed: '2026-05-23',
		listThumbnail: {
			src: '/images/woodworking/coin-rack-hd/coin-rack-hd-front.jpg',
			alt: 'Wall-mounted Harley Davidson poker chip rack, front view',
		},
		images: [
			{
				src: '/images/woodworking/coin-rack-hd/coin-rack-hd-front.jpg',
				alt: 'Wall-mounted Harley Davidson poker chip rack with chips',
				caption: 'Front view with chips.',
			},
			{
				src: '/images/woodworking/coin-rack-hd/coin-rack-hd-front-no-coins.jpg',
				alt: 'Harley Davidson coin rack without chips',
				caption: 'Front view, empty slots.',
			},
			{
				src: '/images/woodworking/coin-rack-hd/coin-rack-hd-front-no-filter.jpg',
				alt: 'Harley Davidson coin rack, unfiltered photo',
				caption: 'Front view (no filter).',
			},
		],
	},
	{
		slug: 'flags-general',
		title: 'Flags',
		description:
			'Most flags are 36" x 19" using common pine, different stains/paints, glued and bradnailed.',
		listSummary: 'Flags of all types I created.',
		completed: '2026-05-22',
		listThumbnail: {
			src: '/images/woodworking/flags-general/flag-full-color-american.jpg',
			alt: 'Full-color American wooden flag',
		},
		images: [
			{
				src: '/images/woodworking/flags-general/flag-full-color-american.jpg',
				alt: 'Full-color American wooden flag',
				caption: 'American flag, full color.',
			},
			{
				src: '/images/woodworking/flags-general/flag-full-color-jeep-by-hand.jpg',
				alt: 'Jeep-themed wooden flag',
				caption: 'Jeep by hand.',
			},
			{
				src: '/images/woodworking/flags-general/flag-full-color-warrant-officer.jpg',
				alt: 'Warrant officer wooden flag',
				caption: 'Warrant officer flag.',
			},
		],
	},
	{
		slug: 'flag-bichard-retirement',
		title: 'CW5 Tom Bichard retirement gift',
		description:
			'36" x 19" full colored flag to commemorate over 30 years of active duty and a 170D God Father plaque to show our appreciation.',
		listSummary:
			'Retirement gift for CW5 Tom Bichard, the God Father of 170Ds.',
		completed: '2026-05-20',
		listThumbnail: {
			src: '/images/woodworking/flag-bichard-retirement/flag-bichard-right.jpg',
			alt: 'Retirement flag and plaque, right-angle view',
		},
		images: [
			{
				src: '/images/woodworking/flag-bichard-retirement/flag-bichard-front.jpg',
				alt: 'Full-color retirement flag, front view',
				caption: 'Front view of the 36" x 19" flag.',
			},
			{
				src: '/images/woodworking/flag-bichard-retirement/flag-bichard-left.jpg',
				alt: 'Retirement flag, left-angle view',
				caption: 'Left angle.',
			},
			{
				src: '/images/woodworking/flag-bichard-retirement/flag-bichard-right.jpg',
				alt: 'Retirement flag, right-angle view',
				caption: 'Right angle.',
			},
			{
				src: '/images/woodworking/flag-bichard-retirement/bichard-god-father.jpg',
				alt: '170D God Father appreciation plaque',
				caption: '170D God Father plaque.',
			},
		],
	},
	{
		slug: 'flag-alabama',
		title: 'University of Alabama Wooden Flag',
		description:
			'36" x 19" wooden flag.',
		completed: '2026-05-02',
		listThumbnail: {
			src: '/images/woodworking/flag-alabama/flag-alabama-left.jpg',
			alt: 'Alabama wooden flag, left-angle view',
		},
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
