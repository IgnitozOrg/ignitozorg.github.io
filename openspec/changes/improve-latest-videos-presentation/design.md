# Design

## Context

See `proposal.md` for motivation and `specs/latest-videos/spec.md` for the behavioral contract. The current section lives in `src/features/latest-videos/components/latest-videos-section.vue` with scoped CSS and adjacent Vitest tests. It renders thumbnail-only links, a centered 16px heading, two mobile columns, and four desktop columns above 760px. Grid overflow currently clips content, which can also clip an external focus ring.

`useLatestVideos` already exposes loading, success, empty, and error states. `youtube-videos.ts` resolves the uploads playlist, requests four entries, normalizes real metadata, and preserves response order. Neither layer needs changing for this presentation work. The existing recency/public-video requirements remain in the main spec.

Figma was inspected through design context and screenshots for desktop `713:3` and mobile `713:186` in file `346TNHhLDHplba26BTHDT2`. The relevant section nodes are `713:14` and `713:187`. The mobile frame is 460px wide; its section is 317px wide. There is no referenced tablet frame.

## Goals / Non-Goals

**Goals:** Use the existing Vue SFC, scoped CSS, shared link component, and tokens to express the inspected section design; separate loaded-card styling from loading styling; validate through the existing project scripts and test suites.

**Non-Goals:** Introduce a new component architecture, refactor the data layer, change global button variants, replace the landing background/hero, or restyle loading skeletons.

## Decisions

### 1. Keep presentation and state ownership in the existing section

Add a header containing the semantic `h2` and browse link outside all state-dependent branches. Build each loaded card as one anchor containing its thumbnail wrapper, decorative play overlay, and visible title; keep the existing full-title `aria-label`, `_blank`, and `noopener noreferrer`. Play icons are non-interactive and hidden from assistive technology. Use `BaseButton` with its existing ghost variant for the browse anchor and a section-local class to set the reference styling without changing shared defaults.

This reuses the existing link semantics. A separate clickable play button or embedded player would add competing interactions. A new global button variant is unnecessary for this one section.

### 2. Translate the inspected geometry into flow layout

Use CSS Grid for loaded cards and flex layout for the header. Reference values:

| Element | Inspected values |
| --- | --- |
| Desktop section | Maximum width 1200px; header and cards separated by 20px; four equal cards with 20px gaps |
| Mobile section | Width 317px at the 460px reference; stacked header with 24px gap; one card column with 16px gaps |
| Heading | Montserrat 800, 24px/30px, `#ffbf00`, left aligned |
| Browse link | Montserrat 700, 14px; 16px horizontal/10px vertical padding; 8px gap; pill radius; translucent surface and gold border |
| Cards | `#0b0b0b` surface; 16px radius; translucent white border; 12px content gap and title padding |
| Thumbnails | Cover crop; 104px height on desktop, 160px on mobile |
| Play overlay | Centered 44px circle, black at 72% opacity; original 20px play SVG |
| Titles | Montserrat 700, 16px, `#e8e8e8` |
| Browse icon | Original 16px arrow-right SVG |

Proposed interpolation: one column below 640px with width `min(317px, 100%)`, two columns from 640px to 1023px, and four columns at 1024px and above. Tablet uses 160px thumbnails and 20px grid gaps. The header stays stacked on mobile and becomes a row where it fits. These breakpoints are implementation assumptions, not an additional Figma reference. Keep the section inside the existing home-page gutters; do not copy Figma's absolute page coordinates.

Use a desktop card minimum height of 204px rather than locking the grid's current 164px height. Let mobile/tablet cards grow naturally. Apply `min-width: 0`, long-word wrapping, and a maximum of three visible title lines, retaining the complete accessible name. Keep grid overflow visible and crop only the thumbnail/card interior so focus remains visible. Fixed absolute coordinates and retaining two mobile columns would fail the mobile reference.

### 3. Reuse tokens and preserve static icon assets

Reuse suitable tokens from `src/styles/tokens.css`; keep distinct reference colors and dimensions as section-scoped custom properties rather than changing global colors. Montserrat weights 700/800 are already loaded in `index.html`.

During apply, obtain fresh Figma design context and download the exact section play and arrow SVGs into `src/assets/latest-videos/`, preserving their intrinsic 20px/16px dimensions. Use the original static assets rather than drawing substitute icons or adding an icon library. Thumbnails and titles remain API-supplied; the sample Figma thumbnails, sample titles, full-page background, and hero assets are not section implementation assets. Do not retain temporary Figma URLs in production code.

### 4. Isolate loaded-card styles from IGZ-17

Give the loaded grid/card presentation its own selectors so revised heights, title layout, clipping, and responsive rules do not alter the current loading placeholders through shared `.latest-videos__grid` or `.latest-videos__tile` rules. Keep loading markup and animation behavior intact; the new header is independent of loading state. Preserve the current empty/error messages and error detail.

### 5. Validate with existing scripts and test suites

Run automated checks exclusively through the existing `package.json` scripts: `npm run validate`, `npm run test:unit -- --run`, `npm run test:e2e`, and `npm run build`. Pass any test filters through those scripts; do not add validation scripts or invoke the test runners directly.

Run the existing component, service, and E2E suites without adding or extending UI tests, browser fixtures, visual comparisons, test-only API keys, or test configuration. Preserve existing loading and service regression coverage. Review the presentation implementation against the acceptance criteria; the existing suites do not establish automated coverage for the new visual behavior.

## Risks / Trade-offs

- No tablet reference → Use the documented two-column interpolation and verify legibility and containment at intermediate widths.
- Current shared selectors couple loaded and loading layouts → Isolate the loaded presentation and retain the loading regression test.
- Real titles and zoom exceed reference samples → Wrap long words, clamp visible titles, retain full accessible names, and avoid fixed title/grid heights.
- Figma asset URLs expire → Refresh design context during apply and store the exact section icons locally.
- Existing full-page visuals differ from Figma → Limit comparison and corrections to the requested section; retain the current surrounding landing design.

## Migration Plan

No data migration or configuration change is needed. Deploy through the existing static GitHub Pages build after the section checks, `npm run validate`, `npm run test:unit -- --run`, `npm run test:e2e`, and `npm run build` pass. Rollback is a revert of the presentation change and its added section assets.
