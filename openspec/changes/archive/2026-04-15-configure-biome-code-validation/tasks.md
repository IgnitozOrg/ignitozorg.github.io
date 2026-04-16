## 1. Dependency Setup

- [x] 1.1 Install `@biomejs/biome` as a development dependency and update the npm lockfile.
- [x] 1.2 Confirm the project still has no competing ESLint, Prettier, or prior Biome configuration that would conflict with the new baseline.

## 2. Biome Configuration

- [x] 2.1 Add a root `biome.json` configuration with formatter and recommended linter rules enabled.
- [x] 2.2 Configure JavaScript and TypeScript formatting for double quotes, semicolons, and trailing commas where supported.
- [x] 2.3 Enable `html.experimentalFullSupportEnabled` and `html.formatter.enabled` so Vue SFC templates and embedded sections are processed.
- [x] 2.4 Keep JSON formatting valid for strict JSON files while preserving the requested trailing comma style for supported syntax.

## 3. Local Scripts

- [x] 3.1 Add a `format` package script that writes Biome formatting changes.
- [x] 3.2 Add `check` and `lint` package scripts for read-only Biome validation.
- [x] 3.3 Add a complete `validate` package script that runs Biome checks and the existing `type-check` workflow.
- [x] 3.4 Preserve the existing `type-check` script using `vue-tsc --build`.

## 4. Verification

- [x] 4.1 Run the formatting script once and review the resulting mechanical formatting changes.
- [x] 4.2 Run the Biome validation scripts and fix any formatting or lint failures.
- [x] 4.3 Run the complete validation script and confirm Vue type checking still passes.
- [x] 4.4 Run the existing build workflow to confirm the tooling addition does not break production builds.
