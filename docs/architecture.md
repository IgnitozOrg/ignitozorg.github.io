# Architecture

## Overview

This project is an SPA landing page for Ignitoz built with Vue 3.5 and TypeScript.

The architecture follows Vue 3.5 official recommendations: Composition API with `<script setup>`, Single-File Components, Pinia for state management, Vue Router for navigation, and Vitest for testing.

## Technical Direction

- Use Vue 3.5 with TypeScript as the core stack.
- Use Vite as the build tool.
- Keep the static entry point at the repository root as `index.html`.
- Keep all application source code under `src/`.
- Use Composition API exclusively — do not use Options API.
- Use `<script setup>` syntax in all Single-File Components.

## Project Structure

```text
src/
  main.ts          # App entry point: creates app, registers plugins, mounts
  App.vue          # Root component with <RouterView>
  router/          # Vue Router configuration and route definitions
  pages/           # Route-level page components (one folder per page)
  features/        # Feature modules with their own components, composables, and logic
  components/      # Shared/reusable UI components (not tied to a specific feature)
  composables/     # Shared composable functions (useXxx pattern)
  stores/          # Pinia stores
  services/        # API clients, external service integrations
  utils/           # Pure utility/helper functions
  types/           # Shared TypeScript types and interfaces
  styles/          # Global CSS: tokens, base rules
  assets/          # Static assets (images, fonts, SVGs)
```

### Folder Responsibilities

- `pages/`: one folder per route (e.g. `pages/Home/`, `pages/About/`). Each contains a page-level `.vue` component and optionally page-scoped styles.
- `features/`: self-contained feature modules. A feature may include its own components, composables, types, and stores when the scope is feature-specific.
- `components/`: shared UI components used across multiple pages or features. Co-locate test files next to the component (e.g. `BaseButton.vue` and `BaseButton.spec.ts`).
- `composables/`: shared stateful logic following the `useXxx` naming convention. Return plain objects with refs for destructuring support.
- `stores/`: Pinia stores using the Composition API syntax (`defineStore` with `setup` function).
- `services/`: API calls and integrations with external services. Keep HTTP logic separate from components and stores.
- `utils/`: pure functions with no Vue dependency. Stateless helpers for formatting, validation, etc.
- `types/`: shared TypeScript interfaces, type aliases, and enums.

## Component Design

- Author all components as Single-File Components (`.vue`).
- Use `<script setup lang="ts">` in every component.
- Use `defineProps` and `defineEmits` with TypeScript type-based declarations.
- Use `defineModel` for two-way binding where appropriate.
- Prefer scoped styles (`<style scoped>`) to avoid CSS leakage.
- Use multi-word component names (e.g. `BaseButton`, `HomePage`) to avoid conflicts with HTML elements.
- Co-locate unit tests next to the component file they test.

## Composables

- Name composable functions with the `use` prefix (e.g. `useMouse`, `useFetch`).
- Encapsulate stateful reactive logic using Vue's Composition API (`ref`, `computed`, `watch`, `onMounted`, etc.).
- Always return plain objects containing refs — do not return reactive objects — so consumers can destructure without losing reactivity.
- Accept `ref`, getter, or raw values as inputs; normalize with `toValue()`.
- Clean up side effects in `onUnmounted`.
- Call composables only inside `<script setup>` or the `setup()` function, synchronously.

## State Management

- Use Pinia as the single state management solution.
- Define stores with the Composition API syntax (`defineStore` with a setup function).
- Keep stores focused on a single domain concern.
- For simple, component-local state, use `ref`/`reactive` directly — not everything needs a store.

## Routing

- Use Vue Router with `createRouter` and `createWebHistory`.
- Define routes in `src/router/index.ts`.
- Use lazy-loaded route components with dynamic `import()` for code splitting.

## CSS Design

- Use scoped styles in SFCs as the default.
- For short component styles, keep the `<style scoped>` block inside the `.vue` file.
- For larger page-level styles, co-locate a CSS file with the page component and import it from the SFC with `<style scoped src="./PageName.css"></style>`, as in `src/pages/Home/HomePage.vue` and `src/pages/Home/HomePage.css`.
- Use kebab-case for CSS class names.
- Use CSS custom properties for shared design tokens (colors, spacing, radii).
- Keep global tokens in `src/styles/tokens.css` and base rules in `src/styles/base.css`.
- Import global stylesheets from `src/main.ts`.
- Name page-specific classes with a stable page prefix such as `landing-*` so templates remain readable and page styles do not collide with shared component classes.

## Testing

- Use Vitest as the test runner.
- Use `@vue/test-utils` for component testing with `mount`/`shallowMount`.
- Co-locate test files next to the source file (e.g. `BaseButton.spec.ts` beside `BaseButton.vue`).
- Name test files with the `.spec.ts` suffix.

## TypeScript

- Use strict TypeScript configuration.
- Prefer type-based `defineProps<{}>()` and `defineEmits<{}>()` over runtime declarations.
- Place shared types in `src/types/`. Keep feature-specific types inside their feature folder.

## Current Decisions

- Architecture: SPA landing page.
- Framework: Vue 3.5 with Composition API and `<script setup>`.
- Language: TypeScript.
- Build tool: Vite.
- Routing: Vue Router.
- State management: Pinia.
- Testing: Vitest + @vue/test-utils.
- CSS approach: scoped styles in SFCs, co-located page CSS via `<style scoped src>`, global tokens/base via CSS custom properties.
- Site entry point: root `index.html`.
- Source root: `src/`.
