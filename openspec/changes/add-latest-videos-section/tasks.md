## 1. Feed Data

- [x] 1.1 Create the latest-videos feature structure with shared TypeScript types for normalized video items.
- [x] 1.2 Implement an Atom feed parser that extracts video ID, title, video URL, thumbnail URL, and published date from feed entries.
- [x] 1.3 Implement a feed service that fetches the public channel feed and returns the four newest normalized videos.
- [x] 1.4 Add parser and service unit tests for successful parsing, newest-first ordering, missing thumbnail fallback, and failed fetch handling.

## 2. Latest Videos UI

- [x] 2.1 Create a latest videos composable or component state flow for loading, loaded, and unavailable states.
- [x] 2.2 Create a `LatestVideosSection` Vue component that renders the section label and up to four video anchors.
- [x] 2.3 Render real video thumbnails and titles with accessible link labels for each video item.
- [x] 2.4 Add the section to the home page below the existing channel CTA.

## 3. Responsive Styling

- [x] 3.1 Translate the desktop Figma direction into a four-card row with dark translucent video tiles.
- [x] 3.2 Translate the mobile Figma direction into a stable two-by-two video grid.
- [x] 3.3 Preserve visible focus states, touch targets, and non-broken loading or unavailable presentation.
- [x] 3.4 Keep styling within the existing token-based CSS approach without adding Tailwind or a new UI framework.

## 4. Verification

- [x] 4.1 Add component tests that verify the section label, four video items, thumbnail rendering, newest-first order, and corresponding links.
- [x] 4.2 Run the unit test suite and fix any regressions.
- [x] 4.3 Run the complete local validation workflow.
- [ ] 4.4 Run the production build workflow.
