## ADDED Requirements

### Requirement: Biome dependency
The project SHALL install Biome as a development dependency so formatting and validation commands resolve from the local project toolchain.

#### Scenario: Dependency is available locally
- **WHEN** a developer installs project dependencies
- **THEN** the Biome CLI is available through npm scripts without requiring a global installation

### Requirement: Biome configuration
The project SHALL provide a root Biome configuration aligned with the Vue 3, TypeScript, Vite, Vitest, and Playwright stack.

#### Scenario: Configuration exists at the repository root
- **WHEN** a developer runs a Biome command from the repository root
- **THEN** Biome loads the project configuration without requiring extra CLI flags

#### Scenario: Vue files are covered
- **WHEN** Biome processes `.vue` single-file components
- **THEN** the configuration enables Vue-aware rules and HTML-ish file support for the Vue stack

### Requirement: Formatting conventions
The project SHALL configure Biome formatting to use double quotes and semicolons for JavaScript and TypeScript syntax.

#### Scenario: Double quotes are enforced
- **WHEN** Biome formats JavaScript, TypeScript, or Vue script content
- **THEN** string literals are formatted with double quotes where Biome controls quote style

#### Scenario: Semicolons are enforced
- **WHEN** Biome formats JavaScript, TypeScript, or Vue script content
- **THEN** statements are formatted with semicolons where Biome controls semicolon insertion

### Requirement: Local scripts
The project SHALL expose npm scripts for formatting, validation, and safe fix application through Biome.

#### Scenario: Formatting script is available
- **WHEN** a developer runs the formatting script
- **THEN** Biome formats supported project files using the configured conventions

#### Scenario: Validation script is available
- **WHEN** a developer runs the validation script
- **THEN** Biome validates supported project files using the configured formatter, linter, and assist rules

#### Scenario: Safe fix script is available
- **WHEN** a developer runs the safe fix script
- **THEN** Biome applies supported formatter and safe analyzer fixes to project files

### Requirement: Type checking remains separate
The project SHALL preserve the existing Vue and TypeScript type-checking workflow alongside Biome validation.

#### Scenario: Existing type check is preserved
- **WHEN** the Biome setup is added
- **THEN** the existing `type-check` script remains available and continues to run `vue-tsc --build`
