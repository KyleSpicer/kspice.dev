/**
 * Renders src/pages/resume.md to public/resume.pdf using headless Chrome.
 * Requires Google Chrome (set CHROME_PATH if not in default locations).
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const mdPath = path.join(root, 'src', 'pages', 'resume.md');
const outPdf = path.resolve(root, 'public', 'resume.pdf');
const tmpHtml = path.resolve(root, 'public', '.resume-print.html');

let md = fs.readFileSync(mdPath, 'utf8');
md = md.replace(/^---[\s\S]*?---\s*/, '');

const body = marked.parse(md);
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<style>
@page { size: letter; margin: 0.55in; }
* { box-sizing: border-box; }
body { font-family: "Segoe UI", system-ui, -apple-system, sans-serif; font-size: 11pt; line-height: 1.42; color: #1a1a1a; }
h1 { font-size: 1.55rem; margin: 0 0 0.4em; font-weight: 700; }
h2 { font-size: 1.08rem; margin: 1.35em 0 0.35em; font-weight: 600; color: #146c6c; }
h3 { font-size: 0.98rem; margin: 0.95em 0 0.28em; font-weight: 600; }
p { margin: 0 0 0.65em; }
ul, ol { margin: 0 0 0.65em; padding-left: 1.2em; }
li { margin: 0.2em 0; }
a { color: #146c6c; }
code { font-family: ui-monospace, Consolas, monospace; font-size: 0.88em; background: #f0eef6; padding: 0.08em 0.35em; border-radius: 3px; }
em { color: #444; }
</style>
</head>
<body>${body}</body>
</html>`;

fs.mkdirSync(path.dirname(outPdf), { recursive: true });
fs.writeFileSync(tmpHtml, html, 'utf8');

const chromeCandidates = [
	process.env.CHROME_PATH,
	path.join(process.env.PROGRAMFILES || 'C:\\Program Files', 'Google/Chrome/Application/chrome.exe'),
	path.join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Google/Chrome/Application/chrome.exe'),
	process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe') : null,
].filter(Boolean);

const chrome = chromeCandidates.find((p) => fs.existsSync(p));
if (!chrome) {
	throw new Error('Google Chrome not found. Install Chrome or set CHROME_PATH to chrome.exe');
}

const fileUrl = pathToFileURL(tmpHtml).href;
try {
	const result = spawnSync(
		chrome,
		[
			'--headless=new',
			'--disable-gpu',
			'--no-first-run',
			'--no-sandbox',
			'--allow-file-access-from-files',
			`--print-to-pdf=${outPdf}`,
			'--no-pdf-header-footer',
			'--virtual-time-budget=8000',
			fileUrl,
		],
		{ stdio: 'inherit' },
	);
	if (result.status !== 0) {
		throw new Error(`Chrome exited with code ${result.status}`);
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
