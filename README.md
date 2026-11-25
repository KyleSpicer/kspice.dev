# kspice.dev

Source for [kspice.dev](https://kspice.dev), my personal site. It's a static site built with [Astro](https://astro.build/) and covers:

- **Programming:** tutorials, tools I've written (such as SnailNet), and developer references
- **HomeLab:** blog posts and server specs for my home lab
- **Woodworking:** project write-ups and photo galleries
- **Resume and book recommendations**

## Hosting

The site is hosted on **GitHub Pages** at the custom domain `kspice.dev`. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it. You can also start a deploy manually under **Actions → Deploy Astro site to Pages → Run workflow**.

In the repo's **Settings → Pages**, **Source** must be set to **GitHub Actions**.

## Run locally

Requires [Node.js](https://nodejs.org/) 22.12 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:4321. The page reloads when you save a file.

To check the production build before pushing:

```bash
npm run build     # writes the static site to dist/
npm run preview   # serves dist/ locally
```

## Adding content

| To add | Put it in |
|---|---|
| A tutorial | `src/pages/programming/<slug>.md`, plus an entry in `src/data/programming/tutorials.ts` |
| A tool write-up | `src/pages/programming/tools/<slug>.md`, plus an entry in `src/data/programming/tools.ts` |
| A reference link | `src/data/programming/references.ts` |
| A HomeLab post | `src/content/homelab/<slug>.md` (frontmatter: `title`, `published`, optional `updated` and `listSummary`) |
| A HomeLab spec page | `src/content/homelab-specs/<slug>.md` |
| A woodworking project | `src/data/woodworking/projects.ts`, with photos in `public/images/woodworking/<slug>/` |
| Images for a tutorial | `src/tutorials-notes/<slug>/`, referenced with a relative path (Astro optimizes them at build time) |

The layout, navigation, and styles are in `src/layouts/`, `src/components/` and `src/styles/`.

## Resume PDF

`npm run resume:pdf` renders `src/pages/resume.md` to `public/downloads/resume.pdf`. It requires [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html) on your `PATH`, or `WKHTMLTOPDF_PATH` set to the binary.
