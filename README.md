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

Use Node.js 24 (`>=24.0.0 <25.0.0`). The selected patch must also satisfy the
locked dependencies' own engine requirements. CI uses Node.js 24.

Node.js **24.18.0** is the validated runtime for browser preparation. Node.js
24.16.0 has a [ZIP extraction regression](https://github.com/nodejs/node/issues/63487)
that can block this locked Playwright version; the fix is included in
[Node.js 24.18.0](https://nodejs.org/en/blog/release/v24.18.0).
If you use nvm, select the validated runtime with:

```sh
nvm install 24.18.0
nvm use 24.18.0
```

Install the versions recorded in `package-lock.json`:

```sh
npm ci
```

To deliberately add or update a dependency, run `npm install <package>@<version>`
(add `--save-dev` for a development dependency). npm saves the exact version;
review and commit both `package.json` and `package-lock.json`. Existing direct
dependencies are pinned to the versions already resolved in the lockfile.

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

Install Playwright browsers explicitly, then run end-to-end tests. Browser
installation is a manual preparation step and remains available with the npm
policy active:

```sh
npx playwright install
npm run test:e2e
```

To run browsers without windows locally, use `CI=true npm run test:e2e` after
`npm run build`. For a future Linux CI runner, select the same validated Node.js
patch and prepare browsers with `npx playwright install --with-deps`, which also
installs required system libraries. These explicit preparation commands do not
require disabling `ignore-scripts`.
