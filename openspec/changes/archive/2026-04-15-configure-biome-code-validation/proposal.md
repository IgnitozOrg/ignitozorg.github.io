## Why

The project needs a consistent baseline for formatting and general code validation before development grows across Vue, TypeScript, CSS, and JSON files. Adding Biome now establishes one local workflow for style and lint checks while keeping Vue-specific type validation in place.

## What Changes

- Add Biome as the project's primary formatter and general linter.
- Add an initial Biome configuration for the current Vue 3, Vite, TypeScript, CSS, and JSON stack.
- Expose package scripts for formatting code, checking formatting/lint rules, and running the complete validation flow locally.
- Keep Vue type validation through the existing type-check workflow instead of relying on Biome for Vue-specific correctness.

## Capabilities

### New Capabilities
- `code-quality`: Defines the repository baseline for formatting, linting, and local code validation.

### Modified Capabilities

## Impact

- Affects project tooling configuration and local development scripts.
- Adds a development dependency for Biome.
- Establishes formatting preferences for double quotes, trailing commas, and semicolons.
- Preserves the existing Vue and TypeScript validation path through `vue-tsc --build`.
