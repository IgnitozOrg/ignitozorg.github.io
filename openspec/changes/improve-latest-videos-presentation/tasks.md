# Tasks

## 1. Header and channel navigation

- [ ] 1.1 Add the persistent section header and channel anchor in `latest-videos-section.vue`, extending its component tests to verify the destination, new-tab attributes, and visibility in success, empty, and error states; verify the feature component suite passes.

## 2. Reusable video card

- [ ] 2.1 Create `components/video-card/video-card.vue` with a typed `video` prop, visible title, thumbnail, decorative playback cue, and accessible native link; add co-located unit tests verifying standalone rendering with different video inputs, full accessible names, destinations, and new-tab attributes, and verify the card suite passes.
- [ ] 2.2 Integrate `VideoCard` into `latest-videos-section.vue`, extending the section tests to verify the supplied video data, order, fewer-video rendering, and preserved loading/empty/error branches; verify the section suite passes.
- [ ] 2.3 Implement scoped card styles in `video-card.css` and header/success-grid styles in the section CSS using the referenced Figma properties; verify browser comparisons against both frames, long/unbroken title containment at an intermediate width, visible focus, and unchanged loading placeholders. Record the inspected Figma version or date with the comparison evidence.

## 3. Integration verification

- [ ] 3.1 Verify the home page in mobile, tablet, and desktop browser viewports with successful, fewer-video, empty, and error fixtures; record evidence of readable content, no horizontal overflow, keyboard activation, visible unclipped focus, and preserved unrelated landing sections.
- [ ] 3.2 Run `npm run test:unit -- --run`, `npm run validate`, and `npm run build`; verify all pass and the existing video service tests still preserve video selection and ordering without service or composable changes.
