# Architecture

## Overview

This project is a static SPA landing page for Ignitoz.

The current architecture favors native web technologies, a lightweight local development workflow, and compatibility with static hosting such as GitHub Pages.

## Technical Direction

- Use HTML, CSS, and JavaScript as the core stack.
- Keep the landing page static and client-side only.
- Keep the static entry point at the repository root as `index.html`.
- Keep application source code and supporting assets under `src/`.
- Keep repository-level hosting metadata, such as `CNAME`, at the repository root.
- Do not add a frontend framework unless the project grows beyond a simple landing page.
- Do not add a bundler unless the project needs asset processing, advanced module handling, or a larger component workflow.
- Keep production compatible with static hosting from the repository root and preserve the existing `CNAME` configuration.

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
- Use global stylesheets linked from HTML.
- Use modular CSS organization by physically separating styles into purpose-based files.
- Keep root-level tokens, global base rules, and page-specific styles in separate files.
- Do not use bundler-style CSS Modules unless the project later adopts a bundler.
- Do not keep tokens, base rules, and home styles in the same file.

Required CSS organization:

```text
index.html
src/
  styles/
    tokens.css
    base.css
    home.css
```

Responsibilities:

- `index.html`: static site entry point loaded by static hosting.
- `tokens.css`: `:root`, design tokens, CSS custom properties, and theme-level values.
- `base.css`: global base rules such as `box-sizing`, document-level defaults, and user preference media queries.
- `home.css`: styles specific to the landing page or home page sections.

This is modular CSS organization, not bundler-style CSS Modules. Files are loaded directly from the root `index.html` with `<link rel="stylesheet">`.

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

For this landing page, prefer `<link rel="stylesheet">` unless Web Components, Shadow DOM, or another clear use case makes CSS module scripts worthwhile.

## Local Development

Use a lightweight static server:

```bash
npm run dev
```

Then open:

```text
http://localhost:8000
```

The `dev` script serves the repository root so `index.html`, `CNAME`, and `src/` keep the same relative paths used by production:

```bash
python3 -m http.server 8000
```

If the project later needs live reload or asset processing, consider Vite with vanilla JavaScript as the next step.

## Current Decisions

- Architecture: static SPA landing page.
- Runtime: browser only.
- Backend: none.
- Framework: none for now.
- Bundler: none for now.
- JavaScript pattern: ES Modules plus Module Pattern.
- CSS approach: native CSS, modular organization, kebab-case classes, CSS custom properties.
- Site entry point: root `index.html`.
- Source root for supporting code/assets: `src/`.
- Local server: Python `http.server` through `npm run dev`.
