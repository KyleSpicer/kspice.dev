import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Project root (directory that contains `src/`). */
const repoRoot = fileURLToPath(new URL('../..', import.meta.url));

function gitLastCommitIsoDay(relativePosixPath: string): string | null {
	try {
		const out = execFileSync(
			'git',
			['log', '-1', '--format=%cs', '--', relativePosixPath],
			{ cwd: repoRoot, encoding: 'utf8' },
		)
			.trim()
			.split('\n')[0];
		if (!/^\d{4}-\d{2}-\d{2}$/.test(out)) return null;
		return out;
	} catch {
		return null;
	}
}

function fileMtimeIsoDay(absPath: string): string {
	return fs.statSync(absPath).mtime.toISOString().slice(0, 10);
}

function relativePosix(fromRepoRootAbs: string): string {
	return path.relative(repoRoot, fromRepoRootAbs).split(path.sep).join('/');
}

/**
 * Last calendar day the tutorial Markdown was touched (git commit date),
 * else filesystem mtime. Uses optional `fallbackIsoDay` when the file is missing.
 */
export function getTutorialSourceLastUpdatedIsoDay(
	slug: string,
	fallbackIsoDay?: string,
): string | null {
	const abs = path.join(repoRoot, 'src', 'pages', 'programming', `${slug}.md`);
	if (!fs.existsSync(abs)) return fallbackIsoDay ?? null;
	const git = gitLastCommitIsoDay(relativePosix(abs));
	return git ?? fileMtimeIsoDay(abs);
}

/**
 * Date used for homepage / Programming tutorial lists when the card defines
 * `published` (curated publish day). Otherwise uses git/mtime of the Markdown
 * file via {@link getTutorialSourceLastUpdatedIsoDay}.
 */
export function getTutorialCardListedIsoDay(slug: string, published?: string): string | null {
	if (published) return published;
	return getTutorialSourceLastUpdatedIsoDay(slug);
}

/** Shared `references.ts` row activity — all curated references use the same underlying file. */
export function getReferencesDataLastUpdatedIsoDay(): string | null {
	const abs = path.join(repoRoot, 'src', 'data', 'programming', 'references.ts');
	if (!fs.existsSync(abs)) return null;
	const git = gitLastCommitIsoDay(relativePosix(abs));
	return git ?? fileMtimeIsoDay(abs);
}
