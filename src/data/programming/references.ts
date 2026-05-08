/** Rich text fragment for titles/descriptions that include `.inline-code` spans */
export type RefSegment = { text: string } | { code: string };

export interface ReferenceCard {
	href: string;
	title: RefSegment[];
	description: RefSegment[];
	/**
	 * ISO YYYY-MM-DD — optional fallback; listing “Updated” uses the last commit
	 * on `src/data/programming/references.ts` (shared for all curated links).
	 */
	published?: string;
}

export const referenceCards: ReferenceCard[] = [
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
