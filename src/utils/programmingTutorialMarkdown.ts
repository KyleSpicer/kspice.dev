import fs from 'node:fs';
import path from 'node:path';

/** Project root is `process.cwd()` during `astro build` / dev; avoid `import.meta.url` here (bundled chunks live under `dist/`). */
function programmingMarkdownDir(): string {
	return path.join(process.cwd(), 'src', 'pages', 'programming');
}

function titleFromFrontmatter(markdown: string): string | null {
	const m = /^---\r?\n([\s\S]*?)\r?\n---/m.exec(markdown);
	if (!m) return null;
	const fm = m[1];
	const line = /^title:\s*(.+)$/m.exec(fm);
	if (!line) return null;
	return line[1].trim().replace(/^["']|["']$/g, '');
}

/**
 * Programming `.md` pages under `src/pages/programming/` that are not listed in
 * `tutorialCards`. Used so the homepage “Recently posted” feed still picks up
 * tutorials if a card entry is forgotten (cards remain required for /programming/tutorials).
 */
export function getProgrammingMarkdownOrphanTutorials(
	registeredSlugs: ReadonlySet<string>,
): { slug: string; title: string }[] {
	const dir = programmingMarkdownDir();
	if (!fs.existsSync(dir)) return [];
	const out: { slug: string; title: string }[] = [];
	let entries: fs.Dirent[];
	try {
		entries = fs.readdirSync(dir, { withFileTypes: true });
	} catch {
		return [];
	}
	for (const ent of entries) {
		if (!ent.isFile() || !ent.name.endsWith('.md')) continue;
		const slug = ent.name.replace(/\.md$/, '');
		if (registeredSlugs.has(slug)) continue;
		const raw = fs.readFileSync(path.join(dir, ent.name), 'utf8');
		const title = titleFromFrontmatter(raw) ?? slug;
		out.push({ slug, title });
	}
	return out;
}
