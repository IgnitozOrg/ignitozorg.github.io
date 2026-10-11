# Ignitoz

Ignitoz website, an SPA landing page for presenting the project and linking to content about AI, tools, code, models, and applied innovation.

## Project

- Site: Ignitoz
- Domain: ignitoz.com
- Type: SPA landing page
- Architecture: [Architecture](docs/architecture.md)
- Technical stack: [Stack](docs/stack.md)
- Deployment: [Deployment](docs/deployment.md)

## Development

The project npm policy is shared through the root `.npmrc`:

- `save-exact=true` saves exact versions when dependencies are added or updated.
- `engine-strict=true` rejects installations with incompatible declared engines.
- `ignore-scripts=true` prevents automatic installation scripts from running.

Explicit commands such as `npm run dev`, `npm run build`, and `npm run test:unit`
still execute their requested scripts, but automatically associated pre- and
post-scripts are skipped. Keep these settings active when installing and building.

Use Node.js 24.18.0 or a later Node.js 24 release (`>=24.18.0 <25.0.0`).

Install the versions recorded in `package-lock.json`:

```sh
npm ci
```

To deliberately add or update a dependency, run `npm install <package>@<version>`
(add `--save-dev` for a development dependency). npm saves the exact version;
review and commit both `package.json` and `package-lock.json`.

Run the local development server:

```sh
npm run dev
```

Configure local environment variables:

```sh
cp .env.example .env.local
```

Set `VITE_YOUTUBE_API_KEY` in `.env.local` to a YouTube Data API v3 key for loading the latest channel videos.

Type-check and build for production:

```sh
npm run build
```

Run unit tests:

```sh
npm run test:unit
```

Run end-to-end tests. The script prepares the Playwright browsers before starting
the test runner, so no separate browser installation command is required:

```sh
npm run test:e2e
```

Tests run headless. Linux environments also need system libraries, which can be
prepared with `npx playwright install --with-deps`. Keep `ignore-scripts` enabled.
