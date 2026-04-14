## Why

The project needs a consistent baseline for code formatting and static validation before the Vue application grows further. Linear issue NEX-13 requires a functional Biome setup aligned with the current stack and available through local scripts.

## What Changes

- Add Biome as the project baseline for formatting and lint-style validation.
- Add a Biome configuration tailored to the Vue 3, TypeScript, Vite, Vitest, and Playwright stack.
- Enforce double quotes and semicolons through Biome formatting options.
- Enable Vue-aware Biome support for `.vue` single-file components while preserving `vue-tsc` as the TypeScript type-checking step.
- Add package scripts for formatting, checking, and applying safe fixes locally.

## Capabilities

### New Capabilities
- `code-quality-tooling`: Defines the project-level formatting and validation tooling baseline.

### Modified Capabilities

## Impact

- Affects `package.json` scripts and development dependencies.
- Adds Biome configuration at the repository root.
- Updates the package lockfile when Biome is installed.
- Local validation workflow gains Biome commands alongside the existing build, type-check, unit test, and e2e test scripts.
