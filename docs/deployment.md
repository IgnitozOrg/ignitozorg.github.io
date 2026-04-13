# Deployment

Ignitoz is deployed as a static site to GitHub Pages.

## Domain

- Production domain: `ignitoz.com`
- The custom domain is declared in the repository root `CNAME` file.

## GitHub Actions

Deployment is handled by the GitHub Actions workflow at `.github/workflows/pages.yml`.

The workflow runs on:

- Pushes to the `main` branch
- Manual runs through `workflow_dispatch`

## Build

The build job:

- Runs on `ubuntu-latest`
- Configures GitHub Pages with `actions/configure-pages`
- Uses Node.js 24 with npm cache enabled
- Installs dependencies with `npm ci`
- Builds the site with `npm run build`
- Uploads the `dist` directory as the GitHub Pages artifact

## Publish

The deploy job:

- Waits for the build job to finish
- Uses the `github-pages` environment
- Publishes the uploaded artifact with `actions/deploy-pages`
