/**
 * Prefix a site path with `import.meta.env.BASE_URL` so links and assets work when
 * the site is deployed under a subpath (e.g. GitHub Pages project site) or at `/`.
 *
 * Astro may set `BASE_URL` with or without a trailing slash; we normalize so we never
 * produce `/repoprogramming` instead of `/repo/programming`.
 */
export function sitePath(path: string): string {
	let base = import.meta.env.BASE_URL;
	if (!base.endsWith('/')) {
		base += '/';
	}
	if (!path || path === '/') {
		return base.length > 1 ? base.replace(/\/$/, '') : base;
	}
	const trimmed = path.startsWith('/') ? path.slice(1) : path;
	return `${base}${trimmed}`;
}
