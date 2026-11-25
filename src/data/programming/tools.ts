export interface ToolCard {
	/** Page lives at `src/pages/programming/tools/{slug}.md` → `/programming/tools/{slug}`. */
	slug: string;
	title: string;
	description: string;
	/** ISO YYYY-MM-DD — listed date and sort order on the homepage and /programming/tools. */
	published: string;
	/** Optional link to the tool's source repository. */
	repo?: string;
}

export const toolCards: ToolCard[] = [
	{
		slug: 'snailnet',
		title: 'SnailNet: A Windows TCP Proxy for Testing High-Latency Links',
		description:
			'Introducing SnailNet v1.0.0, a lightweight Win32 TCP proxy I wrote that injects configurable latency into a connection.',
		published: '2026-11-24',
		repo: 'https://github.com/KyleSpicer/SNAILNET',
	},
];
