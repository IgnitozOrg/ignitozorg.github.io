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
  features/        # Feature modules with their own components, composables, services, utils, and logic
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

- `pages/`: one folder per route (e.g. `pages/home/`, `pages/about/`). Each contains a page-level `.vue` component and optionally page-scoped styles.
- `features/`: self-contained feature modules. Feature-specific code should stay inside the feature folder and be organized by responsibility when applicable: `components/`, `composables/`, `services/`, `utils/`, `stores/`, and `types/`.
- `components/`: shared UI components used across multiple pages or features. Each shared component must live in its own folder with its unit test beside it.
- `composables/`: shared stateful logic following the `useXxx` naming convention. Return plain objects with refs for destructuring support.
- `stores/`: Pinia stores using the Composition API syntax (`defineStore` with `setup` function).
- `services/`: API calls and integrations with external services. Keep HTTP logic separate from components and stores.
- `utils/`: pure functions with no Vue dependency. Stateless helpers for formatting, validation, etc.
- `types/`: shared TypeScript interfaces, type aliases, and enums.

### Naming

- Use kebab-case for folders and filenames under `src/`.
- Keep framework entry files with their conventional names: `src/main.ts` and `src/App.vue`. Companion tests for conventional entry files may keep the same base filename, such as `src/App.spec.ts`.
- Use PascalCase for Vue component names in code (e.g. `UserProfileCard`) even when the file is kebab-case (e.g. `user-profile-card.vue`).
- Use camelCase for TypeScript functions, composables, variables, and types where appropriate (e.g. `useUserProfile`), even when the file is kebab-case (e.g. `use-user-profile.ts`).

### Feature Module Structure

Feature modules must group code by responsibility. Use the same folder names as the shared `src/` areas, but scoped to the feature:

```text
src/features/user-profile/
  components/
    user-profile-card/
      user-profile-card.vue
      user-profile-card.css
      user-profile-card.spec.ts
  composables/
    use-user-profile/
      use-user-profile.ts
      use-user-profile.spec.ts
  services/
    profile-service/
      profile-service.ts
      profile-service.spec.ts
  utils/
    profile-formatter/
      profile-formatter.ts
      profile-formatter.spec.ts
  types/
    types.ts
```

Do not move feature-specific code to root-level `src/services/`, `src/utils/`, `src/components/`, or `src/composables/` unless it is reused by multiple features.

## Component Design

- Author all components as Single-File Components (`.vue`).
- Use `<script setup lang="ts">` in every component.
- Use `defineProps` and `defineEmits` with TypeScript type-based declarations.
- Use `defineModel` for two-way binding where appropriate.
- Prefer scoped style imports (`<style scoped src="./component-name.css"></style>`) to avoid CSS leakage.
- Use multi-word component names in code (e.g. `BaseButton`, `HomePage`) to avoid conflicts with HTML elements.
- Place each component in its own directory with its unit test beside it.

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

- Keep component and page CSS in independent `.css` files when a `.vue` file needs local styles.
- Co-locate the CSS file beside the `.vue` file and use the same kebab-case base filename.
- Import local styles from the SFC with `<style scoped src="./component-name.css"></style>`.
- Do not write inline `<style scoped>` blocks in `.vue` files, except for temporary prototypes that must be extracted before merge.
- Use kebab-case for CSS class names.
- Use CSS custom properties for shared design tokens (colors, spacing, radii).
- Keep global tokens in `src/styles/tokens.css` and base rules in `src/styles/base.css`.
- Import global stylesheets from `src/main.ts`.
- Name page-specific classes with a stable page prefix such as `landing-*` so templates remain readable and page styles do not collide with shared component classes.

Example:

```text
src/components/base-button/
  base-button.vue
  base-button.css
  base-button.spec.ts
```

```vue
<style scoped src="./base-button.css"></style>
```

## Testing

- Use Vitest as the test runner.
- Use `@vue/test-utils` for component testing with `mount`/`shallowMount`.
- Every implementation file must have its own unit test file unless it only contains TypeScript types.
- Every tested unit must live in its own directory. Place the source file and its unit test file in that same directory.
- Name test files with the same base filename as the source file and the `.spec.ts` suffix.
- Do not create `__tests__`, `tests`, or centralized unit-test folders under `src/`.

Valid examples:

```text
src/features/user-profile/services/profile-service/profile-service.ts
src/features/user-profile/services/profile-service/profile-service.spec.ts

src/features/user-profile/utils/profile-formatter/profile-formatter.ts
src/features/user-profile/utils/profile-formatter/profile-formatter.spec.ts

src/features/user-profile/composables/use-user-profile/use-user-profile.ts
src/features/user-profile/composables/use-user-profile/use-user-profile.spec.ts

src/features/user-profile/components/user-profile-card/user-profile-card.vue
src/features/user-profile/components/user-profile-card/user-profile-card.spec.ts
```

Invalid examples:

```text
src/features/user-profile/__tests__/profile-service.spec.ts
src/features/user-profile/profile-service.spec.ts
src/features/user-profile/services/profile-service.spec.ts
src/features/user-profile/components/UserProfileCard/UserProfileCard.vue
src/__tests__/user-profile/profile-service.spec.ts
```

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
- CSS approach: co-located `.css` files imported from SFCs via `<style scoped src>`, global tokens/base via CSS custom properties.
- Site entry point: root `index.html`.
- Source root: `src/`.
