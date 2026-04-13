# Ignitoz

Static SPA landing page for Ignitoz, built with native HTML, CSS, JavaScript, and Vite 8.

## Local Development

Install dependencies:

```bash
npm ci
```

Start the Vite development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:8000
```

The `dev` script runs Vite on port 8000:

```bash
vite --port 8000
```

## Production Build

Generate the production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

GitHub Pages is deployed through `.github/workflows/pages.yml`.

The workflow runs on pushes to `main`, configures GitHub Pages with `actions/configure-pages`, installs dependencies with `npm ci`, builds the site with `npm run build`, uploads the generated `dist/` directory as a Pages artifact, and deploys that artifact with `actions/deploy-pages`.

Keep the custom domain file in `public/CNAME` so Vite copies it into `dist/CNAME` during production builds.

The GitHub Actions deployment uses the generated `dist/CNAME`. A root-level `CNAME` file is not used by this workflow.

## Architecture

See `docs/architecture.md` for architecture and design decisions.
