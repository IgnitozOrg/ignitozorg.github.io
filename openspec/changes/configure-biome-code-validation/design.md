## Context

The repository is a Vue 3, Vite, and TypeScript application with `.vue` Single-File Components using `<script setup lang="ts">`, scoped styles, external CSS, Vue Router, Pinia, Vitest, Playwright, and `vue-tsc --build` for type validation. The project currently has no ESLint, Prettier, or Biome configuration, so adding Biome introduces a baseline without migrating away from existing tooling.

Biome can cover formatting and general linting for the current JavaScript, TypeScript, CSS, JSON, and Vue SFC workflow. Vue SFC support depends on Biome's experimental full HTML support, so the complete validation path must keep `vue-tsc --build` as the Vue-aware type check.

## Goals / Non-Goals

**Goals:**

- Install Biome as a development dependency.
- Add a root `biome.json` configuration that works with Vue SFC files and the repository's Vite/TypeScript stack.
- Configure formatting preferences for double quotes, semicolons, and trailing commas where the language syntax supports them.
- Enable Biome's recommended lint rules as the initial general lint baseline.
- Add local scripts for writing formatting changes and validating formatting, lint, and Vue type correctness.
- Preserve the existing `type-check` script based on `vue-tsc --build`.

**Non-Goals:**

- Replace `vue-tsc` with Biome for Vue-specific type validation.
- Introduce ESLint or Prettier alongside Biome.
- Add custom project-specific lint rules beyond the initial recommended baseline.
- Rework application code structure outside formatting changes required by Biome.
- Treat experimental Vue SFC support as a permanent API contract.

## Decisions

- Use `@biomejs/biome` as the single formatting and general lint dependency.
  - Rationale: Biome covers the current file types without adding separate formatter and linter stacks.
  - Alternative considered: Add Prettier plus ESLint. This would add more dependencies and configuration before the project has custom linting needs.

- Create `biome.json` at the repository root.
  - Rationale: A root config applies consistently to app source, tests, Vite config, TypeScript config, CSS, and JSON files.
  - Alternative considered: Split config by package or source area. The repository is currently a single app, so separate configs would add overhead.

- Enable Biome's formatter and linter with recommended rules.
  - Rationale: This gives the repository a practical first validation baseline while keeping rule tuning small.
  - Alternative considered: Disable linting and use only formatting. That would miss the requested validation baseline.

- Configure JavaScript and TypeScript formatting with double quotes, semicolons, and trailing commas.
  - Rationale: These match the requested code style. Trailing commas should be applied where valid for the language; strict JSON files should remain valid JSON.
  - Alternative considered: Preserve the current single-quote and no-semicolon style. That would not meet the requested formatting baseline.

- Enable `html.experimentalFullSupportEnabled` and `html.formatter.enabled`.
  - Rationale: Biome's full support for Vue SFC files is guarded behind the HTML experimental full support flag, and the HTML formatter is disabled by default while experimental.
  - Alternative considered: Leave Vue files partially processed. That would weaken consistency across templates and scoped styles.

- Add package scripts for local formatting and validation:
  - `format`: run Biome formatting in write mode.
  - `check`: run Biome's formatter and linter checks without writing changes.
  - `lint`: run Biome linting explicitly for focused lint checks.
  - `validate`: run Biome checks and the existing Vue type check.
  - Rationale: Developers need separate write and read-only validation flows, and `validate` keeps `vue-tsc --build` mandatory.
  - Alternative considered: Update only `build`. Build should remain focused on production output while validation remains callable directly.

## Risks / Trade-offs

- Biome Vue SFC support is experimental -> Keep `vue-tsc --build` in the required validation flow and keep the config minimal so future Biome upgrades are easier.
- Initial formatting can touch many source files -> Run Biome formatting once during implementation and review the mechanical diff separately from configuration changes when possible.
- Recommended lint rules may surface existing issues -> Keep the initial rule set broad but avoid adding strict custom rules until the first pass is green.
- JSON trailing commas are not valid for strict JSON files -> Apply trailing comma preferences to JavaScript and TypeScript syntax while keeping JSON parseable.
