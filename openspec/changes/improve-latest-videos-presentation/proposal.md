# Proposal

## Why

The existing latest videos section shows thumbnails without visible titles or a direct way to browse all channel videos. Implementing [IGZ-16](https://linear.app/ignitias/issue/IGZ-16/hu-mejorar-la-presentacion-de-la-seccion-ultimos-videos) will help visitors identify recent videos and explore the Ignitoz channel.

## What Changes

- Align the section presentation with the linked desktop and mobile Figma designs, keeping visual details in Figma rather than duplicating them in requirements.
- Show real video titles and a visual playback cue alongside existing real thumbnails, with readable, contained long titles.
- Add “Ver todos los videos” linking to the channel videos page in a new tab, including in empty and error states.
- Preserve video navigation in a new tab, keyboard access, visible focus, the four newest public videos in newest-first order, and fewer-video handling.
- Keep existing data retrieval and empty/error messages. Skeleton implementation or adaptation belongs to IGZ-17 and is outside this change. Hero, background, and other landing page sections are also outside scope.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `latest-videos`: Extend card identification, responsive presentation, accessible navigation, and channel browsing while preserving existing video sourcing and state behavior.

## Impact

- Latest videos section presentation and its component tests; visual verification on the home page.
- No new routes, API contracts, data retrieval changes, or dependencies are expected.
- Design references: [desktop](https://www.figma.com/design/346TNHhLDHplba26BTHDT2/VideoPortfolio--Community-?node-id=713-3&m=dev) and [mobile](https://www.figma.com/design/346TNHhLDHplba26BTHDT2/VideoPortfolio--Community-?node-id=713-186&m=dev).
