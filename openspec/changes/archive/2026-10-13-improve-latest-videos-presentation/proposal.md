# Proposal

## Why

The existing latest videos section shows thumbnails without visible titles or a route to browse the channel's full video collection. [IGZ-16](https://linear.app/ignitias/issue/IGZ-16/hu-mejorar-la-presentacion-de-la-seccion-ultimos-videos) improves recognition and discovery through the referenced desktop and mobile Figma designs.

## What Changes

- Match the section header, video cards, and browse action to the [desktop reference](https://www.figma.com/design/346TNHhLDHplba26BTHDT2/VideoPortfolio--Community-?node-id=713-3&m=dev) and [mobile reference](https://www.figma.com/design/346TNHhLDHplba26BTHDT2/VideoPortfolio--Community-?node-id=713-186&m=dev).
- Show each real thumbnail with its video title and a visible play indicator; contain long titles while preserving the full accessible link name.
- Add “Ver todos los videos,” opening `https://www.youtube.com/@Ignitoz/videos` in a new tab.
- Adapt the section to mobile, tablet, and desktop without horizontal overflow; retain keyboard activation and visible focus for all links.
- Keep the existing newest-first selection of up to four real public videos and the existing empty/error messages, with the heading and browse action available in both states.

Scope is the latest videos section on the home page. Non-goals are changing data retrieval, adding embedded playback, redesigning other landing sections, or implementing/adapting loading skeletons; skeleton work belongs to IGZ-17.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `latest-videos`: Extend presentation, responsive layout, accessible video navigation, unavailable-data behavior, and navigation to the complete channel video collection. Retain the existing real-video and recency contract.

## Impact

The home page's latest videos presentation, section styles, and static section icons are affected. Validation uses only existing `package.json` scripts and test suites, without new UI tests or test configuration. The existing Vue/TypeScript stack and design tokens remain the foundation. No new runtime dependencies, API calls, environment variables, routes, or deployment changes are required.
