## Context

The current landing page is a Vue 3 route at `src/pages/home/home-page.vue` with scoped CSS in `src/pages/home/home-page.css`, shared tokens in `src/styles/tokens.css`, and shared link styling through `src/components/base-button/base-button.vue`. The page already has the hero copy, primary YouTube channel CTA, and dark/accent visual language needed for the provided Figma direction.

The provided Figma references place `Ultimos videos` inside the hero area:

- Desktop node `564:2`: four horizontal video cards below the `Ver canal` CTA, using dark translucent tiles and a small accent section label. https://www.figma.com/design/346TNHhLDHplba26BTHDT2/VideoPortfolio--Community-?node-id=564-2&m=dev
- Mobile node `112:164`: a two-by-two grid below the CTA and section label, preserving the same visual language. https://www.figma.com/design/346TNHhLDHplba26BTHDT2/VideoPortfolio--Community-?node-id=112-164&m=dev

The video data source is the public YouTube Atom feed:

`https://www.youtube.com/feeds/videos.xml?channel_id=UCRHuQfhjw1c2JkxS6jAGfKg`

Google documents this channel feed URL shape as a YouTube Atom feed topic and the feed entries include identifiers, titles, alternate video links, and publish/update timestamps.

## Goals / Non-Goals

**Goals:**

- Render a visible latest videos section on the landing page.
- Fetch and normalize the four most recent channel videos from the public YouTube feed.
- Show actual video thumbnails and titles rather than decorative placeholders.
- Make every video item an accessible link to its corresponding YouTube video.
- Match the Figma intent: desktop row of four cards and mobile two-by-two grid, visually separated from the primary hero copy.
- Keep the implementation inside the existing Vue, TypeScript, Vite, scoped CSS, and test setup.

**Non-Goals:**

- Add a YouTube Data API key, OAuth flow, backend service, or subscriber-only integration.
- Embed YouTube players or autoplay media on the landing page.
- Add a carousel, pagination, filtering, or full videos page.
- Redesign unrelated landing page sections.
- Introduce Tailwind or another styling framework from the Figma-generated code.

## Decisions

- Add a focused latest-videos feature module under `src/features/latest-videos/`.
  - Rationale: The section has data fetching, parsing, types, UI, and tests that should stay cohesive without bloating the route component.
  - Alternative considered: Put all fetch and rendering logic directly in `home-page.vue`. That would be faster initially but harder to test and reuse.

- Create a small service for feed retrieval and parsing with `fetch`, `DOMParser`, and explicit TypeScript types.
  - Rationale: The browser platform can parse the Atom XML without adding dependencies, and isolating the parser makes unit tests deterministic.
  - Alternative considered: Add an RSS parsing package. That adds dependency weight for a narrow data shape.

- Normalize each feed entry to `{ id, title, url, thumbnailUrl, publishedAt }`.
  - Rationale: The UI only needs stable display and navigation fields, and the normalized model can hide Atom namespace details.
  - Alternative considered: Pass XML elements into the component. That would leak feed structure into presentation code.

- Use the feed's media thumbnail when present and derive a YouTube thumbnail from `yt:videoId` only as a fallback.
  - Rationale: Visitors need visual video representations, and the video ID provides a stable fallback image path if a media thumbnail is absent.
  - Alternative considered: Use the Figma placeholder image. That would not represent published videos.

- Fetch latest videos client-side from the landing page through a `useLatestVideos` composable.
  - Rationale: The site is a static GitHub Pages SPA, so client-side retrieval keeps recent content dynamic without a backend or build-time network requirement.
  - Alternative considered: Generate a static JSON snapshot during build. That avoids runtime fetch risk but makes "latest" depend on deploy cadence and CI network access.

- Render a non-blocking state for loading or feed failure.
  - Rationale: The hero should remain usable even if YouTube is slow or unavailable. The section can reserve its visual space and avoid broken anchors while data is unavailable.
  - Alternative considered: Hide the section until data loads. That weakens the requirement that visitors can recognize the recent-content section.

- Keep video cards as semantic anchors with visible focus states and meaningful labels.
  - Rationale: Click-through behavior should work for mouse, touch, and keyboard users.
  - Alternative considered: Use click handlers on non-anchor cards. That would be less accessible and less robust.

- Implement responsive styling in `home-page.css` or a scoped feature CSS block using existing tokens.
  - Rationale: The current page uses token-driven CSS without utility classes. The Figma sizes should be translated into maintainable CSS grids/flex layouts.
  - Alternative considered: Copy generated React/Tailwind classes. That does not match the Vue stack or project styling approach.

## Risks / Trade-offs

- Direct RSS fetch may be affected by YouTube availability, network latency, or browser CORS behavior -> Keep the fetch isolated, display a non-broken unavailable state, and make the service easy to replace with a proxy or build-time snapshot if runtime access proves unreliable.
- Client-side fetching means videos appear after initial render -> Reserve layout space and avoid blocking the hero CTA while the feed loads.
- Atom namespace parsing can be brittle if selectors are ad hoc -> Centralize parsing in one tested function and cover entries with title, link, ID, thumbnail, and publish date.
- Derived thumbnail URLs depend on YouTube's public image path convention -> Prefer feed-provided thumbnails and use derivation only as fallback.
- Figma uses placeholder image tiles -> Replace placeholders with real thumbnails while preserving tile sizing, spacing, and visual separation.
