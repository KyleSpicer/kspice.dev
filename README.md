# kspice.dev

Static site for [kspice.dev](https://kspice.dev), built with [Astro](https://astro.build/).

## Requirements

- [Node.js](https://nodejs.org/) **22.12+** (see `package.json` → `engines`)

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (Astro’s default is `http://localhost:4321`). Edit files under `src/`; the dev server reloads on save.

## Test a production build locally

```bash
npm run build
npm run preview
```

`build` writes static files to `dist/`. `preview` serves that folder so you can check the site before deploying.

## Resume PDF (`public/resume.pdf`)

```bash
npm run resume:pdf
```

Requires **[wkhtmltopdf](https://wkhtmltopdf.org/downloads.html)** on your `PATH`, or set **`WKHTMLTOPDF_PATH`** to the `wkhtmltopdf` binary. The script renders `src/pages/resume.md` with **Source Sans 3**, **Source Serif 4**, and **Source Code Pro** (loaded from Google Fonts).

## Deploy via GitHub (live site)

1. This repo uses **GitHub Actions** (`.github/workflows/deploy.yml`) to build and deploy to **GitHub Pages**.
2. In the GitHub repo: **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push commits to the **`main`** branch. Each push runs the workflow: install dependencies → `astro build` → upload `dist/` → publish to Pages.
4. After a successful run, the site updates at your Pages URL (for a custom domain like `kspice.dev`, DNS stays pointed at GitHub as you already configured).

You can also run the workflow manually: **Actions → Deploy Astro site to Pages → Run workflow**.

## Project layout

| Path | Role |
|------|------|
| `src/pages/` | Routes (`.astro` files) |
| `src/layouts/Layout.astro` | Shell, nav, theme toggle, footer |
| `src/components/` | Reusable pieces (e.g. contact footer) |
| `src/styles/global.css` | Theme tokens and base styles |
| `src/styles/page-main.css` | Shared styles for inner pages |
| `public/` | Static assets (favicon, etc.) |
| `astro.config.mjs` | `site` URL for canonical links |
