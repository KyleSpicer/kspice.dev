/**
 * Frontmatter dates like `2026-05-02` become UTC midnight in JS, so
 * `toLocaleDateString` in US timezones can show May 1. Use UTC calendar parts
 * and format via a stable local noon for display labels.
 */
export function formatMarkdownDate(d: Date): { label: string; isoDay: string } {
	const y = d.getUTCFullYear();
	const month = d.getUTCMonth();
	const day = d.getUTCDate();
	const isoDay = `${y}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
	const localCal = new Date(y, month, day, 12, 0, 0);
	const label = localCal.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	return { label, isoDay };
}
