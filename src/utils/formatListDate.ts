/** Display date for listing cards (`TutorialCard`, references, etc.) */
export function formatListDate(iso: string): string {
	const d = new Date(iso + 'T12:00:00');
	return d.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}
