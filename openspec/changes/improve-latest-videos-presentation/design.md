# Design

## Context

See `proposal.md` for motivation and `specs/latest-videos/spec.md` for behavior. The existing Vue section already receives title, thumbnail, URL, and publication date from the service. Titles currently appear only in accessible text. The section has a two-column narrow layout and a four-column desktop layout, no channel browsing action, and loading placeholders sharing `.latest-videos__grid` and `.latest-videos__tile` with loaded cards.

The linked Figma frames were visually inspected: desktop shows a heading and channel action above four cards; mobile stacks the action and cards below the heading. Cards show thumbnail, playback cue, and title. Full typography and auto-layout properties were not retrieved during planning; Figma remains their source during implementation.

## Goals / Non-Goals

**Goals:** Encapsulate loaded-card presentation in a reusable, independently testable `VideoCard` within the existing feature and isolate its styling from the loading branch. Resolve containment and accessible link semantics without changing the data model.

**Non-Goals:** Build a generic card library or move the card into shared components before another feature needs it, reorganize existing feature folders, introduce a player or router destination, change global page styling, or redesign loading placeholders.

## Decisions

### Extract a reusable VideoCard within the feature

Create `src/features/latest-videos/components/video-card/` with `video-card.vue`, `video-card.css`, and `video-card.spec.ts`. `VideoCard` accepts a typed `video` prop using the existing `LatestVideo` type and owns the thumbnail, visible title, playback cue, link semantics, and card styles. It must render solely from its input, without fetching data or depending on the section's loading state or position in the list. This makes it reusable with different video inputs and independently testable.

Update `latest-videos-section.vue` to compose `VideoCard` instances. The section retains data loading, the heading, channel action, list layout, and loading/empty/error branches. Existing types, service, and composable remain unchanged. Keeping all markup inline would couple the expanded card presentation to section state; moving it to global shared components now would imply cross-feature usage that does not yet exist. Do not add speculative variants or configuration props.

### Use native links and decorative vector cues

Place the heading and channel link outside the state-dependent content. Keep each entire loaded card as one anchor with `target="_blank"`, `rel="noopener noreferrer"`, and a full-title accessible name. Add visible title text and a decorative, aria-hidden playback cue inside it; do not nest buttons or links. Use a small inline SVG or an existing suitable repository vector rather than an icon dependency. Preserve the current error and empty messages.

### Derive layout from Figma and content constraints

Use feature-scoped CSS and existing landing tokens where they match the design. Separate thumbnail sizing from the title area; replace fixed loaded-grid heights with content-aware sizing. Let titles wrap and apply `overflow-wrap` for unbroken text instead of imposing an unrequested line count. Any visual truncation must be justified by the referenced design while preserving the accessible title. Choose responsive breakpoints based on card readability and the available container, rather than treating them as product requirements. Tablet interpolation is an implementation choice constrained by readability and absence of overflow.

### Isolate success-state styling from loading placeholders

Give the success grid an explicit modifier in the section CSS and put loaded-card styles in `video-card.css`, imported as scoped styles by `VideoCard`. The card must not rely on section-only CSS selectors to render correctly. Preserve the current loading markup, shimmer, dimensions, and responsive layout. Do not change shared rules in ways that silently adapt the skeletons; IGZ-17 owns that work. The header and channel action can remain present in all states without altering the placeholders themselves.

## Risks / Trade-offs

- Shared selectors could alter loading dimensions or animations → scope loaded-card rules explicitly and check existing loading assertions and browser rendering.
- Existing grid overflow clipping can hide link focus rings → ensure focus indicators are visible in the loaded grid without changing the loading branch.
- Full titles and intermediate widths can cause uneven card heights → use flexible sizing and verify long and unbroken titles with fewer than four cards.
- The Figma frames include hero and background changes outside IGZ-16 → compare only the latest videos section; do not reproduce other frame content.
- Figma can change independently of the plan → record the inspected design version or date in implementation review evidence rather than copying visual measurements into behavioral specs.

## Migration Plan

No data migration or dependency change is needed. Ship through the existing GitHub Pages deployment flow after unit, static, build, and browser verification. Roll back the presentation commit if needed. Existing loading-to-content dimension differences may remain until IGZ-17; eliminating those shifts is not an acceptance condition for this change.
