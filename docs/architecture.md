# Architecture

## Overview

This project is a static SPA landing page for Ignitoz.

The current architecture favors native web technologies, a lightweight Vite development workflow, and compatibility with static hosting such as GitHub Pages after running the Vite production build.

## Technical Direction

- Use HTML, CSS, and JavaScript as the core stack.
- Keep the landing page static and client-side only.
- Keep the static entry point at the repository root as `index.html`.
- Keep application source code and supporting assets under `src/`.
- Keep repository-level hosting metadata, such as `CNAME`, at the repository root.
- Do not add a frontend framework unless the project grows beyond a simple landing page.
- Use Vite 8 as the local development server and production build tool.
- Keep production compatible with static hosting from the Vite build output and preserve the existing `CNAME` configuration.
- Deploy GitHub Pages through GitHub Actions by building the site and publishing the generated `dist/` directory.

## JavaScript Design

- Use ES Modules with `<script type="module">`.
- Use the Module Pattern to separate responsibilities by file.
- Use a small entry point, such as `main.js`, to initialize page behavior.
- Add modules only when they provide clear separation, for example:
  - navigation behavior
  - scroll behavior
  - analytics integration
  - form handling
- Keep state minimal and local to the behavior that needs it.
- Prefer native browser APIs before adding dependencies.

## CSS Design

- Use native CSS.
- Use kebab-case for class names.
- Prefer CSS custom properties for shared design tokens such as colors, spacing, and radii.
- Import global stylesheets from the Vite JavaScript entry point.
- Use modular CSS organization by physically separating styles into purpose-based files.
- Keep root-level tokens, global base rules, and page-specific styles in separate files.
- Do not use bundler-style CSS Modules by default, even though Vite supports them.
- Do not keep tokens, base rules, and home styles in the same file.

Required CSS organization:

```text
index.html
src/
  main.js
  styles/
    tokens.css
    base.css
    home.css
```

Responsibilities:

- `index.html`: static site entry point used by Vite in development and production builds.
- `main.js`: Vite JavaScript entry point that imports global CSS and initializes page behavior.
- `tokens.css`: `:root`, design tokens, CSS custom properties, and theme-level values.
- `base.css`: global base rules such as `box-sizing`, document-level defaults, and user preference media queries.
- `home.css`: styles specific to the landing page or home page sections.

This is modular CSS organization, not bundler-style CSS Modules. Files are imported from `src/main.js` with Vite's standard CSS imports.

When JavaScript modules are added, prefer one of these two CSS loading approaches:

- Keep page-level global CSS imported from `src/main.js` when the styles are global to the landing page.
- Import feature-specific CSS from JavaScript with Vite's standard CSS imports, for example `import "./feature.css";`, when the styles belong to a JS module.

Do not use CSS module scripts with `with { type: "css" }` unless Web Components, Shadow DOM, or constructable stylesheets become a requirement.

## CSS Imports From JavaScript

Native CSS imports from JavaScript are possible with CSS module scripts:

```js
import sheet from "./styles.css" with { type: "css" };

document.adoptedStyleSheets = [
  ...document.adoptedStyleSheets,
  sheet,
];
```

This is different from bundler-style CSS Modules that export class name mappings:

```js
import styles from "./button.module.css";
```

For this landing page, prefer Vite's standard CSS imports unless Web Components, Shadow DOM, or another clear use case makes CSS module scripts worthwhile.

## Local Development

Use Vite 8:

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

Use `npm run build` to generate the production build and `npm run preview` to preview it locally.

## Deployment

GitHub Pages is deployed through `.github/workflows/pages.yml`.

The workflow runs on pushes to `main`, configures GitHub Pages with `actions/configure-pages`, installs dependencies with `npm install`, builds the site with `npm run build`, uploads the generated `dist/` directory as a Pages artifact, and deploys that artifact with `actions/deploy-pages`.

Keep the custom domain file in `public/CNAME` so Vite copies it into `dist/CNAME` during production builds.

## Current Decisions

- Architecture: static SPA landing page.
- Runtime: browser only.
- Backend: none.
- Framework: none for now.
- Build tool and dev server: Vite 8.
- JavaScript pattern: ES Modules plus Module Pattern.
- CSS approach: native CSS, modular organization, kebab-case classes, CSS custom properties.
- Site entry point: root `index.html`.
- Source root for supporting code/assets: `src/`.
- CSS loading: standard Vite CSS imports from `src/main.js`.
- Deployment: GitHub Actions publishes the Vite `dist/` output to GitHub Pages.
- Local server: Vite through `npm run dev`.
