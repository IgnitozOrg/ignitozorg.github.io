# Spec Delta

## Purpose

Provide predictable dependency installation for developers and CI by enforcing exact direct dependency versions, runtime compatibility, and restrictions on automatic script execution while preserving production build usability.

## ADDED Requirements

### Requirement: Shared installation policy
The project SHALL provide a version-controlled npm installation policy that saves exact dependency versions, enforces declared engine compatibility, and suppresses automatic installation scripts by default in both local development and CI.

#### Scenario: Policy applies to project installation
- **WHEN** a developer or CI installs project dependencies without overriding the project policy
- **THEN** exact-version saving, strict engine compatibility, and automatic installation script suppression are all active

### Requirement: Exact direct dependency versions
All direct production and development dependencies SHALL be declared as exact versions. Adding or updating a dependency through npm under the project policy SHALL save its exact version without a version range operator.

#### Scenario: Existing declarations use exact versions
- **WHEN** the project's direct production and development dependency declarations are inspected after migration
- **THEN** each declaration specifies one exact version without caret, tilde, wildcard, or other range syntax

#### Scenario: Dependency is added or updated
- **WHEN** a developer adds or updates a direct dependency through npm under the project policy
- **THEN** the resulting declaration records the selected exact version

### Requirement: Migration preserves resolved versions
Converting existing dependency declarations to exact versions SHALL use the versions already resolved in the lockfile, preserve all resolved package versions, and leave dependency declarations and lockfile metadata synchronized.

#### Scenario: Existing dependencies are migrated
- **WHEN** existing dependency ranges are converted to exact versions
- **THEN** each direct dependency matches its previously resolved version
- **AND** no resolved direct or transitive package version changes as part of the conversion
- **AND** the resulting dependency declarations and lockfile metadata are consistent

### Requirement: Supported Node.js runtime
The project SHALL declare Node.js compatibility as `>=24.0.0 <25.0.0`. Installation under the project policy SHALL reject a runtime outside this range and reject packages whose declared engine requirements are incompatible with the installation environment.

#### Scenario: Runtime is outside the supported range
- **WHEN** installation is attempted under the project policy using Node.js below 24.0.0 or at least 25.0.0
- **THEN** installation fails with an engine compatibility error

#### Scenario: Dependency declares an incompatible engine
- **WHEN** installation is attempted under the project policy and a dependency declares engine requirements incompatible with the installation environment
- **THEN** installation fails with an engine compatibility error

#### Scenario: Runtime and dependency engines are compatible
- **WHEN** installation is attempted using Node.js within the supported range and all declared dependency engine requirements are satisfied
- **THEN** engine compatibility enforcement does not prevent installation

### Requirement: Automatic installation scripts are suppressed
Dependency installation under the project policy SHALL NOT automatically execute installation lifecycle scripts, including preinstall, install, and postinstall scripts from the project or its dependencies.

#### Scenario: Package provides installation scripts
- **WHEN** dependencies are installed under the project policy and a package defines installation lifecycle scripts
- **THEN** those scripts are not executed automatically

### Requirement: Explicit project scripts remain available
The project policy SHALL allow developers and CI to explicitly execute project scripts while suppressing their automatically associated pre- and post-scripts.

#### Scenario: Project script is explicitly invoked
- **WHEN** a developer explicitly invokes a project script under the project policy
- **THEN** the requested script runs
- **AND** its automatically associated pre- and post-scripts do not run

### Requirement: Clean installation and production build remain usable
The existing project dependencies SHALL support a clean lockfile-based installation followed by a successful production build on a compatible Node.js 24 runtime, with all installation policy restrictions active throughout the workflow.

#### Scenario: Clean development or CI environment
- **WHEN** the locked dependencies are installed in an environment with no previously installed project dependencies using a compatible Node.js 24 runtime
- **AND** the production build is subsequently executed
- **THEN** installation and compilation succeed with all installation policy restrictions active
- **AND** no automatic installation scripts are required for that workflow to succeed

### Requirement: Browser preparation is integrated with end-to-end testing
The project's existing end-to-end test entry point SHALL prepare the browser binaries required by the locked test tooling before starting the test runner, without a separate developer preparation command or an automatic npm installation hook. Preparation failure SHALL prevent the test runner from starting.

#### Scenario: Required browsers are absent
- **WHEN** a developer invokes the end-to-end test entry point in a compatible environment without the required browser binaries
- **THEN** those binaries are prepared before the test runner starts
- **AND** automatic npm installation scripts remain suppressed

#### Scenario: Required browsers are already present
- **WHEN** a developer invokes the end-to-end test entry point with the required browser binaries already prepared
- **THEN** the existing binaries are reused and the test runner starts

#### Scenario: Browser preparation fails
- **WHEN** browser preparation fails while invoking the end-to-end test entry point
- **THEN** the invocation reports failure and does not start the test runner

### Requirement: Developer installation guidance
The project SHALL provide development documentation explaining the three installation policy rules, the supported Node.js range, and any manual preparation required for dependencies that rely on installation scripts.

#### Scenario: Developer reviews installation guidance
- **WHEN** a developer consults the project's development documentation
- **THEN** the effects of exact-version saving, strict engine compatibility, and automatic script suppression are explained
- **AND** the supported Node.js range is stated
- **AND** the documentation explains that the end-to-end test entry point prepares browser binaries before running tests

#### Scenario: Dependency requires manual preparation
- **WHEN** a supported development workflow requires a dependency preparation step normally performed by an installation script
- **THEN** the documentation identifies the affected dependency and explains the necessary manual step
