export type TutorialCategory = 'visual-studio';

export interface TutorialCard {
	slug: string;
	title: string;
	description: string;
	/** ISO YYYY-MM-DD — shown on the tutorials listing card */
	published?: string;
	/** When set, the tutorial is also listed under matching category sections on /programming/tutorials */
	categories?: readonly TutorialCategory[];
}

export const tutorialCards: TutorialCard[] = [
	{
		slug: 'aliases',
		title: 'Aliases',
		description:
			'How to create and use aliases in bash, PowerShell, and Windows Command Prompt.',
		published: '2026-04-10',
	},
	{
		slug: 'visual-studio-cpp-console-template',
		title: 'Visual Studio Template from Configured C/C++ Console App',
		description:
			'How to create a new C/C++ console app, adjust default settings, and convert to template for repeated use.',
		published: '2026-05-05',
		categories: ['visual-studio'],
	},
	{
		slug: 'visual-studio-cpp-static-library-template',
		title: 'Visual Studio Template from Configured Static Library',
		description:
			'How to create a Static Library program, adjust default settings, and convert to reusable template.',
		published: '2026-05-07',
		categories: ['visual-studio'],
	},
];
