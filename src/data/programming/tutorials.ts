export type TutorialCategory = 'visual-studio' | 'virtual-machines';

export interface TutorialCard {
	slug: string;
	title: string;
	description: string;
	/**
	 * ISO YYYY-MM-DD — when set, used as the tutorial’s listed date and sort order
	 * on the site (homepage + /programming/tutorials). If omitted, listing falls
	 * back to the last git/mtime touch on `src/pages/programming/{slug}.md`.
	 */
	published?: string;
	/** When set, the tutorial is also listed under matching category sections on /programming/tutorials */
	categories?: readonly TutorialCategory[];
}

export const tutorialCards: TutorialCard[] = [
	{
		slug: 'gitea-runner-windows-ubuntu',
		title: 'Gitea Runner: Download and Install on Windows and Ubuntu',
		description:
			'How to download, register, and run a self-hosted Gitea Actions runner as a service on Windows 11 and Ubuntu Server.',
		published: '2026-10-24',
	},
	{
		slug: 'proxmox-ubuntu-server-2604-vm-template',
		title: 'Proxmox VM: Ubuntu Server 26.04 Template and Setup',
		description:
			'How to build a reusable Ubuntu Server 26.04 LTS template in Proxmox VE and set up VMs cloned from it.',
		published: '2026-10-24',
		categories: ['virtual-machines'],
	},
	{
		slug: 'proxmox-windows-11-pro-vm-template',
		title: 'Proxmox VM: Windows 11 Pro Template and Setup',
		description:
			'How to build a reusable Windows 11 Pro 25H2 template in Proxmox VE and set up VMs cloned from it.',
		published: '2026-10-24',
		categories: ['virtual-machines'],
	},
	{
		slug: 'aliases',
		title: 'Aliases',
		description:
			'How to create and use aliases in bash, PowerShell, and Windows Command Prompt.',
		published: '2026-04-10',
	},
	{
		slug: 'sensor-watch-casio-f91w-totp',
		title: 'Sensor Watch Build: Casio F-91W for TOTP',
		description:
			'How to build a Sensor Watch firmware for your personal 2FA TOTP Keys.',
		published: '2026-08-27',
	},
	{
		slug: 'visual-studio-cpp-dynamic-link-library-template',
		title: 'Visual Studio Template from Configured Dynamic Link Library',
		description:
			'How to create a Dynamic Link Library, adjust default settings, and convert to template for repeat use.',
		published: '2026-05-09',
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
	{
		slug: 'visual-studio-cpp-console-template',
		title: 'Visual Studio Template from Configured C/C++ Console App',
		description:
			'How to create a C/C++ console app, adjust default settings, and convert to reusable template.',
		published: '2026-05-05',
		categories: ['visual-studio'],
	},
];
