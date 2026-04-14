## 1. Dependency and Scripts

- [ ] 1.1 Install `@biomejs/biome` as a development dependency using npm.
- [ ] 1.2 Add npm scripts for `format`, `lint`, `check`, and `check:write` without removing existing build, type-check, unit test, or e2e scripts.
- [ ] 1.3 Verify the package lockfile reflects the Biome dependency installation.

## 2. Biome Configuration

- [ ] 2.1 Add a root `biome.json` configuration file.
- [ ] 2.2 Configure Biome formatting to use double quotes and semicolons for JavaScript and TypeScript syntax.
- [ ] 2.3 Configure Biome to process the project stack, including JavaScript, TypeScript, JSON, CSS, and `.vue` single-file components.
- [ ] 2.4 Enable Vue-aware Biome linting through the Vue domain.
- [ ] 2.5 Preserve the existing `vue-tsc --build` type-check workflow.

## 3. Verification

- [ ] 3.1 Run the Biome validation script and address any configuration errors.
- [ ] 3.2 Run the existing type-check script to confirm Vue and TypeScript validation still passes.
- [ ] 3.3 Review the resulting diff to ensure the change is limited to Biome setup, scripts, dependency metadata, and any intentional safe formatting fixes.
