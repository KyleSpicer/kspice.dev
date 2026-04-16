/**
 * Renders src/pages/resume.md to public/downloads/resume.pdf using wkhtmltopdf.
 *
 * Install: https://wkhtmltopdf.org/downloads.html (Windows: installer adds to PATH,
 * or set WKHTMLTOPDF_PATH to the full path of wkhtmltopdf.exe).
 *
 * Google Fonts are loaded over HTTPS; --javascript-delay gives WebKit time to fetch them.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const mdPath = path.join(root, 'src', 'pages', 'resume.md');
const outPdf = path.resolve(root, 'public', 'downloads', 'resume.pdf');
const tmpHtml = path.resolve(root, 'public', '.resume-print.html');

const fontsHref =
	'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&family=Source+Serif+4:ital,wght@0,500;0,600;0,700;1,400&family=Source+Code+Pro:wght@400;600&display=swap';

let md = fs.readFileSync(mdPath, 'utf8');
md = md.replace(/^---[\s\S]*?---\s*/, '');

const body = marked.parse(md);
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="${fontsHref}" rel="stylesheet"/>
<style>
/* Print-oriented resume typography (wkhtmltopdf uses WebKit) */
@page {
	size: letter;
	margin: 0.55in;
}
* {
	box-sizing: border-box;
}
html {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
body {
	font-family: 'Source Sans 3', 'Segoe UI', system-ui, sans-serif;
	font-size: 10.75pt;
	font-weight: 400;
	line-height: 1.48;
	color: #141414;
	max-width: 100%;
	margin: 0;
	padding: 0;
}
h1 {
	font-family: 'Source Serif 4', 'Georgia', 'Times New Roman', serif;
	font-size: 1.65rem;
	font-weight: 700;
	letter-spacing: -0.02em;
	line-height: 1.2;
	margin: 0 0 0.45em;
	color: #0f172a;
}
h2 {
	font-family: 'Source Serif 4', 'Georgia', serif;
	font-size: 1.12rem;
	font-weight: 600;
	letter-spacing: -0.01em;
	margin: 1.35em 0 0.4em;
	padding-bottom: 0.15em;
	border-bottom: 1px solid #c5d4d4;
	color: #115e59;
}
h3 {
	font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
	font-size: 0.98rem;
	font-weight: 600;
	margin: 1em 0 0.3em;
	color: #1e293b;
}
p {
	margin: 0 0 0.65em;
	hyphens: auto;
	-webkit-hyphens: auto;
}
ul,
ol {
	margin: 0 0 0.7em;
	padding-left: 1.25em;
}
li {
	margin: 0.22em 0;
}
li::marker {
	color: #64748b;
}
a {
	color: #0f766e;
	text-decoration: none;
}
strong {
	font-weight: 600;
	color: #0f172a;
}
em {
	color: #334155;
}
code {
	font-family: 'Source Code Pro', 'Cascadia Code', Consolas, monospace;
	font-size: 0.9em;
	font-weight: 400;
	background: #f1f5f9;
	color: #0f172a;
	padding: 0.1em 0.35em;
	border-radius: 3px;
	border: 1px solid #e2e8f0;
}
</style>
</head>
<body>${body}</body>
</html>`;

fs.mkdirSync(path.dirname(outPdf), { recursive: true });
fs.writeFileSync(tmpHtml, html, 'utf8');

function resolveWkhtmltopdf() {
	if (process.env.WKHTMLTOPDF_PATH) {
		const p = process.env.WKHTMLTOPDF_PATH;
		if (fs.existsSync(p)) return p;
		throw new Error(`WKHTMLTOPDF_PATH is set but file not found: ${p}`);
	}
	const winPaths = [
		path.join(process.env.PROGRAMFILES || 'C:\\Program Files', 'wkhtmltopdf', 'bin', 'wkhtmltopdf.exe'),
		path.join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'wkhtmltopdf', 'bin', 'wkhtmltopdf.exe'),
	];
	for (const p of winPaths) {
		if (fs.existsSync(p)) return p;
	}
	const bin = process.platform === 'win32' ? 'wkhtmltopdf.exe' : 'wkhtmltopdf';
	const probe = spawnSync(bin, ['--version'], { encoding: 'utf8' });
	if (probe.status === 0) return bin;
	return null;
}

const wk = resolveWkhtmltopdf();
if (!wk) {
	throw new Error(
		'wkhtmltopdf not found. Install from https://wkhtmltopdf.org/downloads.html ' +
			'or set WKHTMLTOPDF_PATH to wkhtmltopdf.exe (Windows) or the wkhtmltopdf binary.',
	);
}

const args = [
	'--page-size',
	'Letter',
	'--margin-top',
	'0.55in',
	'--margin-right',
	'0.55in',
	'--margin-bottom',
	'0.55in',
	'--margin-left',
	'0.55in',
	'--encoding',
	'UTF-8',
	'--enable-local-file-access',
	'--javascript-delay',
	'2800',
	'--print-media-type',
	tmpHtml,
	outPdf,
];

try {
	const result = spawnSync(wk, args, { stdio: 'inherit' });
	if (result.status !== 0) {
		throw new Error(`wkhtmltopdf exited with code ${result.status}`);
	}
	if (!fs.existsSync(outPdf)) {
		throw new Error('PDF was not created');
	}
} finally {
	try {
		fs.unlinkSync(tmpHtml);
	} catch {
		/* ignore */
	}
}

console.log('Wrote', outPdf);
