## Context

The project is a Vue 3.5, TypeScript, Vite 8 single-page application with Vitest and Playwright already present. Linear issue NEX-13 asks for a functional initial Biome setup with scripts for local formatting and validation.

The repository currently uses npm, as indicated by `package-lock.json`, and already has `vue-tsc --build` as the type-checking command. Biome should become the formatting and static analysis baseline, but it should not replace TypeScript or Vue SFC type checking.

## Goals / Non-Goals

**Goals:**

- Install Biome as a development dependency using the existing npm package workflow.
- Add a root Biome configuration that covers JavaScript, TypeScript, JSON, CSS, and Vue single-file components.
- Configure Biome formatting to use double quotes and semicolons.
- Enable Vue-aware linting through the Vue domain and HTML-ish file support for `.vue` files.
- Add scripts that let developers format, validate, and apply safe Biome fixes locally.

**Non-Goals:**

- Replace `vue-tsc --build` or the existing `build` command.
- Replace Vitest or Playwright validation.
- Migrate the whole repository formatting in the proposal step.
- Add ESLint or Prettier compatibility layers unless a later issue requires them.

## Decisions

- Use `@biomejs/biome` as a devDependency.
  - Rationale: Biome ships the CLI, formatter, linter, and configuration schema as one package and is the direct dependency needed for local and CI usage.
  - Alternative considered: rely on `npx` without a dependency. Rejected because the issue asks for an installed project setup and local scripts should resolve predictably.

- Add a root `biome.json`.
  - Rationale: A root config gives the Vite app a single source of truth for formatting and lint validation.
  - Alternative considered: nested configs per folder. Rejected because the current project is a single app and does not need per-package overrides.

- Configure formatter rules for double quotes and semicolons.
  - Rationale: The requester explicitly requires double quotes and semicolon-terminated lines. Biome supports this through `javascript.formatter.quoteStyle` and `javascript.formatter.semicolons`.
  - Alternative considered: leave defaults. Rejected because defaults do not satisfy the explicit formatting requirements.

- Enable Vue support via `linter.domains.vue` and `html.experimentalFullSupportEnabled`.
  - Rationale: The app uses `.vue` SFCs and Vue 3. Biome's Vue domain provides Vue-specific rules, while HTML-ish support lets Biome process the HTML, CSS, and JavaScript parts of Vue files.
  - Alternative considered: limit Biome to `.ts` files only. Rejected because that would not be a functional setup for the stack current project.

- Preserve `vue-tsc --build` for type checking.
  - Rationale: Biome static analysis is not a substitute for Vue and TypeScript type checking.
  - Alternative considered: treat Biome `check` as the only validation command. Rejected because it would weaken the existing TypeScript validation.

- Add npm scripts for `format`, `lint`, `check`, and `check:write`.
  - Rationale: These cover formatting, validation, and safe fix application without changing the existing build/test commands.
  - Alternative considered: only add `check`. Rejected because the acceptance criteria explicitly call for scripts to format and validate.

## Risks / Trade-offs

- Biome Vue and HTML-ish support is experimental -> keep `vue-tsc` and existing tests in the validation path, and avoid removing other quality gates.
- First run may produce many formatting changes -> keep the implementation focused and review formatting output separately if needed.
- Some lint rules may report noisy findings in `.vue` files -> start with recommended domains and adjust config overrides only if actual validation output shows false positives.
- Biome may not match every rule from eslint-plugin-vue -> treat Biome as the base formatting and validation layer, not as a complete replacement for every possible framework-specific rule.

## Migration Plan

1. Install `@biomejs/biome` as a development dependency using npm.
2. Add `biome.json` at the repository root with project-specific formatter, linter, assist, file, VCS, and Vue/HTML support options.
3. Add package scripts for formatting, linting, checking, and applying safe fixes.
4. Run the new Biome validation command.
5. Run the existing `type-check` command to confirm the setup preserves Vue and TypeScript validation.
6. If Biome reports legitimate formatting or lint issues, apply fixes with the configured write command and review the resulting diff.

Rollback is straightforward: remove the Biome dependency, scripts, and `biome.json`, then restore the lockfile changes.

## Open Questions

- None.
