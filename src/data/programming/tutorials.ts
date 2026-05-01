export interface TutorialCard {
	slug: string;
	title: string;
	description: string;
	/** ISO YYYY-MM-DD — shown on the tutorials listing card */
	published?: string;
}

export const tutorialCards: TutorialCard[] = [
	{
		slug: 'aliases',
		title: 'Aliases',
		description:
			'How to create and use aliases in bash, PowerShell, and Windows Command Prompt.',
		published: '2026-04-10',
	},
];
