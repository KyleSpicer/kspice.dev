# kspice.dev

Static site for [kspice.dev](https://kspice.dev), built with [Astro](https://astro.build/).

**kspice.dev** is a personal portfolio and technical blog covering four main areas:

- **Programming** — step-by-step tutorials (shell aliases, Visual Studio C++ project templates) and curated developer reference cards
- **HomeLab** — blog posts and hardware specs documenting home server and networking projects
- **Woodworking** — photo galleries and write-ups for completed woodworking projects
- **Resume & Recommendations** — a Markdown-driven resume (with PDF export) and book recommendations

Content is a mix of Astro pages, Markdown files in `src/content/`, and TypeScript data files in `src/data/`. Pushing to `main` builds and deploys the site automatically via GitHub Actions.

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

## Resume PDF (`public/downloads/resume.pdf`)

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

### Pages & routes

| Path | Role |
|------|------|
| `src/pages/` | All routes — `.astro` pages and the Markdown resume |
| `src/pages/programming/` | Programming index, tutorials listing, and references listing |
| `src/pages/homelab/` | HomeLab index and `[slug].astro` dynamic route for posts |
| `src/pages/homelab/specs/` | HomeLab specs index and `[slug].astro` dynamic route |
| `src/pages/woodworking/` | Woodworking index and `[slug].astro` dynamic route for projects |
| `src/pages/resume.md` | Resume source (rendered to HTML; PDF exported via `npm run resume:pdf`) |
| `src/pages/recommendations.astro` | Book recommendations page |

### Content (Markdown)

| Path | Role |
|------|------|
| `src/content/homelab/` | HomeLab blog posts — each `.md` file becomes a route under `/homelab/` |
| `src/content/homelab-specs/` | HomeLab hardware/config specs — each `.md` file becomes a route under `/homelab/specs/` |

Frontmatter fields: `title`, `published` (ISO date), `updated` (ISO date), `listSummary`.

### Data files (TypeScript)

| Path | Role |
|------|------|
| `src/data/programming/tutorials.ts` | Tutorial listing entries (title, slug, description, published date) |
| `src/data/programming/references.ts` | Reference link cards shown on `/programming/references` |
| `src/data/woodworking/projects.ts` | Woodworking projects with gallery image metadata |
| `src/data/homepage-updates.ts` | "Last updated" timestamps displayed on the homepage for resume and recommendations |

### UI & styles

| Path | Role |
|------|------|
| `src/layouts/Layout.astro` | Main shell — nav, theme toggle (dark/light), footer |
| `src/layouts/MarkdownTutorial.astro` | Wrapper for Markdown-based programming tutorials |
| `src/components/SocialFooter.astro` | Footer with social/contact links |
| `src/components/RecentlyPosted.astro` | "Recently posted" activity feed on the homepage |
| `src/components/WoodGallery.astro` | Thumbnail grid + lightbox viewer for woodworking galleries |
| `src/styles/global.css` | CSS custom properties for dark/light theming and base typography |
| `src/styles/page-main.css` | Shared styles for inner content pages |

### Other

| Path | Role |
|------|------|
| `public/` | Static assets — favicon, images, and the generated resume PDF |
| `public/images/woodworking/` | Project gallery images, organized by project slug |
| `src/utils/` | Shared helpers (date formatting, path utilities, git-date lookups) |
| `src/tutorials-notes/` | Draft notes written while authoring programming tutorials (not published) |
| `astro.config.mjs` | Astro configuration — sets `site` URL for canonical links |
| `.github/workflows/deploy.yml` | CI/CD pipeline — builds and deploys to GitHub Pages on push to `main` |
