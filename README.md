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

Install dependencies:

```sh
npm install
```

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

Run end-to-end tests:

```sh
npx playwright install
npm run test:e2e
```
