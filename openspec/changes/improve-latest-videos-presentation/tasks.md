# Tasks

Validation MUST use only the existing `package.json` scripts: `npm run validate`, `npm run test:unit -- --run`, `npm run test:e2e`, and `npm run build`. Test filters can be passed as arguments to these scripts. Run the existing test suites without adding or extending UI tests, browser fixtures, visual comparisons, or test configuration. Do not add validation scripts or invoke Vitest/Playwright directly.

## 1. Persistent section header

- [ ] 1.1 Add the section header and browse action to `latest-videos-section.vue` using `BaseButton` with local styling; verify heading/action remain visible for loading, success, empty, and error states and the action uses the exact channel-videos URL with `_blank` and `noopener noreferrer` (AC 1, 5, 7).

## 2. Identifiable video cards

- [ ] 2.1 Download the original section play and arrow-right SVGs from refreshed Figma context into `src/assets/latest-videos/`; verify non-empty local files, intrinsic 20px/16px dimensions, and no temporary asset URL in production callsites (AC 1, 2).
- [ ] 2.2 Add visible titles and decorative play overlays to loaded-card markup; verify each card remains one link to its original video with the complete title in its accessible name and no embedded player (AC 2, 4).

## 3. Responsive styling

- [ ] 3.1 Update `latest-videos-section.css` with section-local reference values, loaded-only grid/card selectors, title containment, and unclipped focus styles; verify one/two/four columns at mobile/tablet/desktop sizes and unchanged loading placeholders (AC 1, 2, 3, 8).

## 4. Integration validation

- [ ] 4.1 Run `npm run validate`, `npm run test:unit -- --run`, `npm run test:e2e`, and `npm run build`; verify all checks pass using the existing scripts without data-service changes, new runtime dependencies, or skeleton adaptation.
- [ ] 4.2 Record the existing scripts' validation results and review the implementation against IGZ-16's eight acceptance criteria; preserve the existing real-video selection, loading, empty, and error regression tests without adding UI tests.
