/** Rich text fragment for titles/descriptions that include `.inline-code` spans */
export type RefSegment = { text: string } | { code: string };

export interface ReferenceCard {
	href: string;
	title: RefSegment[];
	description: RefSegment[];
	/** ISO YYYY-MM-DD — shown on the references listing card */
	published?: string;
}

export const referenceCards: ReferenceCard[] = [
	{
		href: 'https://barrgroup.com/sites/default/files/barr_c_coding_standard_2018.pdf',
		title: [{ text: 'Barr C coding standard (2018)' }],
		description: [
			{
				text: "The Barr Group's embedded C coding standard as a PDF. The baseline that the ",
			},
			{ code: '.clang-format' },
			{ text: ' entry below is meant to approximate.' },
		],
		published: '2026-04-12',
	},
	{
		href: 'https://github.com/petertorelli/clang-format-barr-c/blob/master/.clang-format',
		title: [{ text: 'Barr C ' }, { code: '.clang-format' }],
		description: [
			{ text: "Peter Torelli's " },
			{ code: '.clang-format' },
			{
				text: " that approximates the Barr Group's embedded C coding guidelines (2018) via clang-format. Useful for consistent C code styling.",
			},
		],
		published: '2026-04-12',
	},
];
