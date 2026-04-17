## Context

The current landing page is implemented in `src/pages/home/home-page.vue` with page-specific styles in `src/pages/home/home-page.css`. It has a header, hero, and YouTube channel call-to-action, but it does not yet surface recent channel content.

This change adds a live latest videos section for `https://www.youtube.com/@Ignitoz`. The implementation must use YouTube Data API v3, keep the API integration out of page markup, and support frontend environment configuration for local development and production.

External references:

- Channel: https://www.youtube.com/@Ignitoz
- Desktop design: https://www.figma.com/design/346TNHhLDHplba26BTHDT2/VideoPortfolio--Community-?node-id=564-14&m=dev
- Mobile design: https://www.figma.com/design/346TNHhLDHplba26BTHDT2/VideoPortfolio--Community-?node-id=513-20&m=dev
- YouTube `channels.list`: https://developers.google.com/youtube/v3/docs/channels/list
- YouTube `playlistItems.list`: https://developers.google.com/youtube/v3/docs/playlistItems/list

## Goals / Non-Goals

**Goals:**

- Display a visible latest videos section on the landing page.
- Fetch and render the four most recently published real videos from the Ignitoz channel.
- Render real thumbnails returned by YouTube and link each item to its corresponding YouTube watch URL.
- Keep API calls and response mapping inside feature-owned service code.
- Configure the YouTube API key through Vite frontend environment variables for local and production builds.
- Match the provided desktop and mobile Figma references while preserving the current Vue 3 and CSS organization.

**Non-Goals:**

- Embed YouTube players or support in-page playback.
- Add authentication, server-side proxying, or a backend cache.
- Build pagination, filtering, or a full video archive.
- Add a global Pinia store for data that is only consumed by this section.

## Decisions

### Add a focused `latest-videos` feature module

Create the feature under `src/features/latest-videos/` with feature-specific components, composables, service code, and types. The home page should import a single section component and keep page composition concerns in `src/pages/home/`.

Alternative considered: implement fetching and rendering directly in `home-page.vue`. This is faster initially but couples the page to external API response shapes and makes testing failure states harder. A feature module follows the repo architecture and keeps the integration replaceable.

### Retrieve uploads through the channel uploads playlist

Use `channels.list` with `part=contentDetails` and `forHandle=@Ignitoz` to resolve the channel's uploads playlist. Then call `playlistItems.list` with `part=snippet`, the resolved `playlistId`, and `maxResults=4`.

Alternative considered: use `search.list` ordered by date. That can return broader search results and has a higher quota cost profile. The uploads playlist path is more precise for "published on this channel" and maps directly to real uploaded videos.

Alternative considered: hardcode the uploads playlist ID. That removes one request but creates a hidden production constant that is harder to verify from the requested channel URL. The handle lookup keeps the implementation tied to the public channel reference.

### Use frontend environment configuration for the API key

Read the key from `import.meta.env.VITE_YOUTUBE_API_KEY`. Add local setup guidance through an example environment file and document the same variable for production deployment.

The channel handle can remain a source constant because the requirement targets the Ignitoz channel specifically. If future requirements need channel configurability, introduce `VITE_YOUTUBE_CHANNEL_HANDLE` then.

Alternative considered: store the key in source code. This is not acceptable because it would expose a reusable credential in the repository. Even with a Vite environment variable, the key is visible in built frontend assets, so the Google Cloud key must be restricted by HTTP referrer and quota.

### Keep state local to the section

Use a composable for loading state, error state, and successful video data. Do not add Pinia unless another route or feature needs the same data.

Alternative considered: a shared Pinia store. That adds global state for a single page section and makes the data lifecycle broader than needed.

### Normalize YouTube responses before rendering

Map YouTube playlist items into a small internal video type with `id`, `title`, `thumbnailUrl`, `publishedAt`, and `url`. Choose the best available thumbnail from the response, preferring higher resolution keys and preserving YouTube's returned thumbnail URL.

The renderer should not use mock videos as a runtime fallback. Loading and error states may keep the section visible, but successful content must come from YouTube API data.

### Render links as accessible external anchors

Each video card should be an anchor to `https://www.youtube.com/watch?v=<videoId>` with external-link safety attributes. Images should use the video title for accessible text, lazy loading, and stable aspect-ratio sizing to avoid layout shifts.

### Integrate layout into the current landing page

Place the section after the hero content in the landing page flow and update `home-page.css` so the page can stack the hero and latest videos section. The section should follow the provided desktop and mobile Figma nodes and reuse existing landing tokens for color, spacing, focus styles, and typography.

The hero's sizing should be revisited so the latest videos section is not buried below an unnecessary full-screen block on viewports where the Figma design expects it to be visible or discoverable.

### Test service mapping and UI states

Add unit tests beside the new service/composable/component files. Mock `fetch` for successful responses, missing API key, API failure, malformed or empty responses, and link/thumbnail rendering. Update existing home page tests so they account for the new section without depending on live network calls.

## Risks / Trade-offs

- Frontend API key exposure -> Restrict the YouTube API key by production and local HTTP referrers, and set quota limits in Google Cloud.
- YouTube quota or network failures -> Keep request count small, expose a clear error state, and avoid repeated fetches during one component lifecycle.
- Channel handle lookup failure -> Keep API errors observable in tests and consider a future channel ID or uploads playlist fallback if handle resolution becomes unreliable.
- Fewer than four public uploaded videos returned -> Render the available real videos without inventing filler content, while preserving section layout.
- Thumbnail shape variance -> Use fixed aspect-ratio containers and object-fit styling so API image dimensions do not shift the layout.

## Migration Plan

1. Add the feature module, YouTube service, composable, section component, and local tests.
2. Add local environment documentation or example configuration for `VITE_YOUTUBE_API_KEY`.
3. Insert the section into the home page and update responsive CSS to match the desktop and mobile Figma references.
4. Configure `VITE_YOUTUBE_API_KEY` in the production hosting environment before deployment.
5. Validate with unit tests, type checking, and a production build.

Rollback is straightforward: remove the section import/usage from the home page while leaving the rest of the landing page intact. If the deployment key is misconfigured, remove or unset `VITE_YOUTUBE_API_KEY` until the key restrictions are corrected.

## Open Questions

- What production domain or preview domains should be allowed in the Google Cloud API key HTTP referrer restrictions?
- Should the section display a channel-level fallback link when YouTube data cannot be loaded, or should it only show an inline error state?
