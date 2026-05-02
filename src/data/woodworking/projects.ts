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

/** `completed` is the date entries/photos were added on the site (ISO YYYY-MM-DD). */
export const woodworkingProjects: WoodworkingProject[] = [
	{
		slug: 'misc-projects',
		title: 'Miscellaneous projects',
		description:
			'These are projects that were quick and fun, if you have any ideas, shoot me an email!',
		listSummary: 'various odd-jobs and fun projects',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/misc-projects/tux-penguin.jpg',
			alt: 'Wooden Tux the Linux penguin figure',
		},
		images: [
			{
				src: '/images/woodworking/misc-projects/tux-penguin.jpg',
				alt: 'Wooden Tux the Linux penguin figure',
				caption: 'Tux penguin.',
			},
			{
				src: '/images/woodworking/misc-projects/ed-richie-logo-plaque.jpg',
				alt: 'Ed Richie logo wooden plaque',
				caption: 'Ed Richie logo plaque.',
			},
			{
				src: '/images/woodworking/misc-projects/globe-life-desk-plaque.jpg',
				alt: 'Globe Life desk wooden plaque',
				caption: 'Globe Life desk plaque.',
			},
			{
				src: '/images/woodworking/misc-projects/margo-puppies.jpg',
				alt: 'Wooden Margo puppies piece',
				caption: 'Margo puppies.',
			},
			{
				src: '/images/woodworking/misc-projects/painting.jpg',
				alt: 'Woodworking painting project',
				caption: 'Painting.',
			},
			{
				src: '/images/woodworking/misc-projects/rtj.dev.jpg',
				alt: 'rtj.dev wooden plaque',
				caption: 'rtj.dev.',
			},
			{
				src: '/images/woodworking/misc-projects/santa-cruz-hand.jpg',
				alt: 'Santa Cruz hand wooden piece',
				caption: 'Santa Cruz hand.',
			},
			{
				src: '/images/woodworking/misc-projects/shibbystix.jpg',
				alt: 'Shibbystix wooden piece',
				caption: 'Shibbystix.',
			},
			{
				src: '/images/woodworking/misc-projects/signature.jpg',
				alt: 'Wooden signature piece',
				caption: 'Signature.',
			},
			{
				src: '/images/woodworking/misc-projects/signature-2.jpg',
				alt: 'Wooden signature piece, alternate',
				caption: 'Signature (2).',
			},
			{
				src: '/images/woodworking/misc-projects/signature-3.jpg',
				alt: 'Wooden signature piece, third variation',
				caption: 'Signature (3).',
			},
			{
				src: '/images/woodworking/misc-projects/wooden-jackolaterns.jpg',
				alt: 'Wooden jack-o’-lanterns',
				caption: 'Jack-o’-lanterns.',
			},
		],
	},
	{
		slug: 'coin-racks',
		title: 'Coin racks',
		description: 'Custom 36" x 19" coin racks.',
		listSummary: 'various coin rack builds',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/coin-racks/old-glory-4.jpg',
			alt: 'Wooden Old Glory coin rack, fourth variation',
		},
		images: [
			{
				src: '/images/woodworking/coin-racks/old-glory-4.jpg',
				alt: 'Wooden Old Glory coin rack, fourth variation',
				caption: 'Old Glory (4).',
			},
			{
				src: '/images/woodworking/coin-racks/old-glory.jpg',
				alt: 'Wooden Old Glory coin rack',
				caption: 'Old Glory.',
			},
			{
				src: '/images/woodworking/coin-racks/old-glory-2.jpg',
				alt: 'Wooden Old Glory coin rack, second variation',
				caption: 'Old Glory (2).',
			},
			{
				src: '/images/woodworking/coin-racks/old-glory-3jpg.jpg',
				alt: 'Wooden Old Glory coin rack, third variation',
				caption: 'Old Glory (3).',
			},
			{
				src: '/images/woodworking/coin-racks/coin-rack-personal.jpg',
				alt: 'Personal custom wooden coin rack',
				caption: 'Personal rack.',
			},
			{
				src: '/images/woodworking/coin-racks/coin-rack-warrant-logo.jpg',
				alt: 'Wooden coin rack with warrant officer logo',
				caption: 'Warrant logo rack.',
			},
		],
	},
	{
		slug: 'civil-affairs-team-patch',
		title: 'Civil Affairs Team Patch plaques',
		description:
			'Our Civil Affairs Team patch was a silhouette of John Wayne. Each team member had to earn their patch and is a constant reminder of our time on the team. I made a batch and shipped them to the guys.',
		listSummary:
			'Our Civil Affairs Team Patch created into commemorated plaques.',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/civil-affairs-team-patch/complete-wood-patches-left.jpg',
			alt: 'Civil Affairs team patch wooden plaques, left-angle view',
		},
		images: [
			{
				src: '/images/woodworking/civil-affairs-team-patch/patch-carve-in-progress.jpg',
				alt: 'Civil Affairs team patch plaque, CNC carve in progress',
				caption: 'Carve in progress.',
			},
			{
				src: '/images/woodworking/civil-affairs-team-patch/patch-carve-complete.jpg',
				alt: 'Civil Affairs team patch plaque after CNC carve',
				caption: 'Carve complete.',
			},
			{
				src: '/images/woodworking/civil-affairs-team-patch/complete-wood-patches-left.jpg',
				alt: 'Civil Affairs team patch wooden plaques, left-angle view',
				caption: 'Left angle.',
			},
			{
				src: '/images/woodworking/civil-affairs-team-patch/complete-wood-patches.jpg',
				alt: 'Batch of Civil Affairs team patch wooden plaques',
				caption: 'Full batch.',
			},
		],
	},
	{
		slug: 'can-usa-coin-rack',
		title: 'Canadian and American coin rack',
		description:
			'A Canadian Soldier on tour in the States requested a full size coin rack that incorporated the Canadian and American flags.',
		listSummary:
			'Full size coin rack for a Canadian Soldier completing a tour in the States.',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/can-usa-coin-rack/can-usa-coin-rack-close-left-full.jpg',
			alt: 'Canadian and American full-size coin rack, close left view',
		},
		images: [
			{
				src: '/images/woodworking/can-usa-coin-rack/can-usa-coin-rack-close-left-full.jpg',
				alt: 'Coin rack with Canadian and American flags, close left',
				caption: 'Close left, full rack.',
			},
			{
				src: '/images/woodworking/can-usa-coin-rack/can-usa-coin-rack-with-coins.jpg',
				alt: 'Coin rack filled with challenge coins',
				caption: 'With coins.',
			},
			{
				src: '/images/woodworking/can-usa-coin-rack/can-usa-coin-rack-top.jpg',
				alt: 'Coin rack, top view',
				caption: 'Top view.',
			},
			{
				src: '/images/woodworking/can-usa-coin-rack/can-usa-coin-rack-close-left.jpg',
				alt: 'Coin rack, close left detail',
				caption: 'Close left.',
			},
			{
				src: '/images/woodworking/can-usa-coin-rack/can-usa-coin-rack-close-right.jpg',
				alt: 'Coin rack, close right detail',
				caption: 'Close right.',
			},
		],
	},
	{
		slug: 'cutting-board',
		title: 'First cutting board',
		description:
			'Hardwood cutting board. Cut down, glued up, planed, and CNC-carved.',
		listSummary: 'first cutting board from scratch.',
		completed: '2026-05-01',
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
		completed: '2026-05-01',
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
		completed: '2026-05-01',
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
		completed: '2026-05-01',
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
		completed: '2026-05-01',
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
		completed: '2026-05-01',
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
		completed: '2026-05-01',
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
	{
		slug: 'puerto-rican-flag',
		title: 'Wooden Puerto Rican Flag',
		description: '36" x 19" wooden Puerto Rican Flag.',
		listSummary: 'Wooden Puerto Rican Flag',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/puerto-rican-flag/pr-flag-left-2.jpg',
			alt: 'Puerto Rican wooden flag, left-angle view',
		},
		images: [
			{
				src: '/images/woodworking/puerto-rican-flag/pr-flag-front.jpg',
				alt: 'Puerto Rican wooden flag, front view',
				caption: 'Front view.',
			},
			{
				src: '/images/woodworking/puerto-rican-flag/pr-flag-left-2.jpg',
				alt: 'Puerto Rican wooden flag, left-angle view',
				caption: 'Left angle.',
			},
			{
				src: '/images/woodworking/puerto-rican-flag/pr-flag-left.jpg',
				alt: 'Puerto Rican wooden flag, alternate left view',
				caption: 'Left angle (alternate).',
			},
			{
				src: '/images/woodworking/puerto-rican-flag/pr-flag-right.jpg',
				alt: 'Puerto Rican wooden flag, right-angle view',
				caption: 'Right angle.',
			},
			{
				src: '/images/woodworking/puerto-rican-flag/pr-flag-customert.jpg',
				alt: 'Customer with Puerto Rican wooden flag',
				caption: 'With the customer.',
			},
		],
	},
	{
		slug: 'tabs',
		title: 'Custom military tabs',
		description:
			'Customers requested various custom tabs in different shapes and sizes.',
		listSummary: 'Various military tabs for customers',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/tabs/gun-pilot-retired.jpg',
			alt: 'Custom wooden tab, gun pilot retired design',
		},
		images: [
			{
				src: '/images/woodworking/tabs/gun-pilot-retired.jpg',
				alt: 'Custom wooden military tab, gun pilot retired',
				caption: 'Gun pilot retired tab.',
			},
			{
				src: '/images/woodworking/tabs/j-and-i-ranch-tab.jpg',
				alt: 'Custom J and I Ranch wooden tab',
				caption: 'J and I Ranch tab.',
			},
			{
				src: '/images/woodworking/tabs/jamaican-ranger-tab.jpg',
				alt: 'Custom Jamaican Ranger wooden tab',
				caption: 'Jamaican Ranger tab.',
			},
			{
				src: '/images/woodworking/tabs/magnetic-tabs.jpg',
				alt: 'Magnetic wooden military tabs',
				caption: 'Magnetic tabs.',
			},
			{
				src: '/images/woodworking/tabs/misc.jpg',
				alt: 'Miscellaneous custom wooden tabs',
				caption: 'Miscellaneous tabs.',
			},
			{
				src: '/images/woodworking/tabs/retired-unfinished.jpg',
				alt: 'Retired tab, unfinished wood',
				caption: 'Retired tab (unfinished).',
			},
			{
				src: '/images/woodworking/tabs/retired.jpg',
				alt: 'Custom retired wooden tab',
				caption: 'Retired tab.',
			},
			{
				src: '/images/woodworking/tabs/tab-sulligan.jpg',
				alt: 'Custom wooden Sulligan tab',
				caption: 'Sulligan tab.',
			},
			{
				src: '/images/woodworking/tabs/waterborne.jpg',
				alt: 'Custom waterborne wooden tab',
				caption: 'Waterborne tab.',
			},
		],
	},
	{
		slug: 'customer-images',
		title: 'Customer images',
		description: 'Various images sent to us by customers.',
		listSummary: 'various images sent by customers',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/customer-images/cutomer-home-sign-ga.jpg',
			alt: 'Customer photo of Georgia home sign',
		},
		images: [
			{
				src: '/images/woodworking/customer-images/cutomer-home-sign-ga.jpg',
				alt: 'Customer photo of Georgia home sign',
				caption: 'Georgia home sign.',
			},
			{
				src: '/images/woodworking/customer-images/cutomer-home-sign-minn.jpg',
				alt: 'Customer photo of Minnesota home sign',
				caption: 'Minnesota home sign.',
			},
			{
				src: '/images/woodworking/customer-images/full-coin-rack.jpg',
				alt: 'Customer photo of full coin rack',
				caption: 'Full coin rack.',
			},
			{
				src: '/images/woodworking/customer-images/home-sign-ga.jpg',
				alt: 'Georgia home sign from customer',
				caption: 'Georgia home sign (alternate).',
			},
			{
				src: '/images/woodworking/customer-images/neighborhood-sign-found-by-neighbor-2.jpg',
				alt: 'Neighborhood sign found by neighbor, second photo',
				caption: 'Neighborhood sign (neighbor find).',
			},
			{
				src: '/images/woodworking/customer-images/neighborhood-sign-found-by-neighbor.jpg',
				alt: 'Neighborhood sign found by neighbor',
				caption: 'Neighborhood sign (neighbor find, alternate).',
			},
			{
				src: '/images/woodworking/customer-images/neighborhood-sign.jpg',
				alt: 'Customer photo of neighborhood sign',
				caption: 'Neighborhood sign.',
			},
			{
				src: '/images/woodworking/customer-images/smith-name-plate.jpg',
				alt: 'Customer photo of Smith name plate',
				caption: 'Smith name plate.',
			},
			{
				src: '/images/woodworking/customer-images/sniper-tab.jpg',
				alt: 'Customer photo of sniper tab',
				caption: 'Sniper tab.',
			},
		],
	},
	{
		slug: 'magnetic-name-plates',
		title: 'Magnetic name plates',
		description: 'hand-routed, oak name plates with magnets embedded.',
		listSummary: 'hard wood magnetic name plates',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/magnetic-name-plates/various.jpg',
			alt: 'Assorted magnetic wooden name plates',
		},
		images: [
			{
				src: '/images/woodworking/magnetic-name-plates/various.jpg',
				alt: 'Assorted magnetic wooden name plates',
				caption: 'Various plates.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/air-dry.jpg',
				alt: 'Magnetic name plates air drying',
				caption: 'Air dry.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/bruns.jpg',
				alt: 'Bruns magnetic wooden name plate',
				caption: 'Bruns.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/bunker.jpg',
				alt: 'Bunker magnetic wooden name plate',
				caption: 'Bunker.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/hood.jpg',
				alt: 'Hood magnetic wooden name plate',
				caption: 'Hood.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/larson.jpg',
				alt: 'Larson magnetic wooden name plate',
				caption: 'Larson.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/schall.jpg',
				alt: 'Schall magnetic wooden name plate',
				caption: 'Schall.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/shall-bruns-magnetic.jpg',
				alt: 'Shall and Bruns magnetic name plates',
				caption: 'Shall and Bruns.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/skip.jpg',
				alt: 'Skip magnetic wooden name plate',
				caption: 'Skip.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/snipes.jpg',
				alt: 'Snipes magnetic wooden name plate',
				caption: 'Snipes.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/unfinished.jpg',
				alt: 'Unfinished magnetic name plate',
				caption: 'Unfinished.',
			},
			{
				src: '/images/woodworking/magnetic-name-plates/unfinished2.jpg',
				alt: 'Unfinished magnetic name plate, alternate',
				caption: 'Unfinished (alternate).',
			},
		],
	},
	{
		slug: 'cnc-router-cabinet',
		title: 'Shapeoko 4 XXL rolling cabinet',
		description:
			'Built a custom, rolling cabinet for the Shapeoko 4 XXL CNC Machine.',
		listSummary:
			'custom rolling cabinet for Shapeoko 4 XXL CNC Machine',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/cnc-router-cabinet/complete.jpg',
			alt: 'Finished rolling cabinet for Shapeoko 4 XXL CNC',
		},
		images: [
			{
				src: '/images/woodworking/cnc-router-cabinet/frame-complete.jpg',
				alt: 'CNC cabinet frame assembled',
				caption: 'Frame complete.',
			},
			{
				src: '/images/woodworking/cnc-router-cabinet/adding-wheels.jpg',
				alt: 'Adding casters to CNC cabinet frame',
				caption: 'Adding wheels.',
			},
			{
				src: '/images/woodworking/cnc-router-cabinet/frame-complete-with-wheels.jpg',
				alt: 'CNC cabinet frame with wheels installed',
				caption: 'Frame with wheels.',
			},
			{
				src: '/images/woodworking/cnc-router-cabinet/side-panels-installed.jpg',
				alt: 'CNC cabinet with side panels installed',
				caption: 'Side panels.',
			},
			{
				src: '/images/woodworking/cnc-router-cabinet/side-panels-installed-2.jpg',
				alt: 'CNC cabinet side panels, alternate view',
				caption: 'Side panels (alternate).',
			},
			{
				src: '/images/woodworking/cnc-router-cabinet/complete.jpg',
				alt: 'Finished rolling cabinet for Shapeoko 4 XXL CNC',
				caption: 'Complete.',
			},
		],
	},
	{
		slug: 'pow-mia',
		title: 'POW/MIA plaque for Grandpa Jack',
		description:
			'My grandpa Jack was a WW2 POW and woodworker. I made a commemorative plaque with epoxy for him.',
		listSummary:
			'My grandpa Jack was a WW2 POW and woodworker.',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/pow-mia/pow-mia-finished-left.jpg',
			alt: 'Finished POW/MIA commemorative plaque, left-angle view',
		},
		images: [
			{
				src: '/images/woodworking/pow-mia/pow-mia-unfinished.jpg',
				alt: 'POW/MIA plaque before finish',
				caption: 'Unfinished.',
			},
			{
				src: '/images/woodworking/pow-mia/pow-mia-plaque-unfinished-2.jpg',
				alt: 'POW/MIA plaque work in progress',
				caption: 'Unfinished (alternate).',
			},
			{
				src: '/images/woodworking/pow-mia/pow-mia-finished-left.jpg',
				alt: 'Finished POW/MIA commemorative plaque, left-angle view',
				caption: 'Finished, left angle.',
			},
			{
				src: '/images/woodworking/pow-mia/pow-mia-plaque-finished-2.jpg',
				alt: 'Finished POW/MIA commemorative plaque, alternate view',
				caption: 'Finished (alternate).',
			},
			{
				src: '/images/woodworking/pow-mia/jack-and-katherine.jpg',
				alt: 'Grandpa Jack and Katherine',
				caption: 'Jack and Katherine.',
			},
			{
				src: '/images/woodworking/pow-mia/sere-graduation.jpg',
				alt: 'SERE graduation photo',
				caption: 'SERE graduation.',
			},
		],
	},
	{
		slug: 'home-signs',
		title: 'Home signs',
		description: 'I created home signs for different states.',
		listSummary: 'various home signs I created',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/home-signs/home-signs-mn.jpg',
			alt: 'Finished Minnesota home sign',
		},
		images: [
			{
				src: '/images/woodworking/home-signs/home-signs-mn.jpg',
				alt: 'Finished Minnesota home sign',
				caption: 'Minnesota.',
			},
			{
				src: '/images/woodworking/home-signs/home-signs-mi.jpg',
				alt: 'Finished Michigan home sign',
				caption: 'Michigan.',
			},
			{
				src: '/images/woodworking/home-signs/home-sign-unfinished-ga.jpg',
				alt: 'Georgia home sign before finish',
				caption: 'Georgia (unfinished).',
			},
			{
				src: '/images/woodworking/home-signs/home-sign-unfinished-mi.jpg',
				alt: 'Michigan home sign before finish',
				caption: 'Michigan (unfinished).',
			},
			{
				src: '/images/woodworking/home-signs/home-sign-unfinished-va.jpg',
				alt: 'Virginia home sign before finish',
				caption: 'Virginia (unfinished).',
			},
		],
	},
	{
		slug: 'shop-images',
		title: 'Shop images',
		description: 'Various images from my various shops.',
		listSummary: 'various images from around my shops',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/shop-images/cnc-in-action.jpg',
			alt: 'CNC machine cutting wood in the shop',
		},
		images: [
			{
				src: '/images/woodworking/shop-images/cnc-in-action.jpg',
				alt: 'CNC machine cutting wood in the shop',
				caption: 'CNC in action.',
			},
			{
				src: '/images/woodworking/shop-images/hawaii-setup.jpg',
				alt: 'Woodworking shop setup in Hawaii',
				caption: 'Hawaii setup.',
			},
			{
				src: '/images/woodworking/shop-images/shop-hawaii.jpg',
				alt: 'Woodworking shop in Hawaii',
				caption: 'Shop, Hawaii.',
			},
		],
	},
	{
		slug: 'sere',
		title: 'SERE knife-holding plaque',
		description:
			'I created a SERE school plaque to hold the knife I carried throughout the course and in Afghanistan and Somalia.',
		listSummary: 'a SERE knife-holding plaque',
		completed: '2026-05-01',
		listThumbnail: {
			src: '/images/woodworking/sere/sere-plaque.jpg',
			alt: 'Wooden SERE school plaque holding a survival knife',
		},
		images: [
			{
				src: '/images/woodworking/sere/sere-plaque.jpg',
				alt: 'Wooden SERE school plaque holding a survival knife',
				caption: 'SERE plaque with knife.',
			},
		],
	},
];
