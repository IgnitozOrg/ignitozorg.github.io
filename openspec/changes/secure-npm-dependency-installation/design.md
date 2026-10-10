# Design

## Context

See `proposal.md` for motivation and `specs/dependency-management/spec.md` for the behavioral contract. The capability is already named `dependency-management` in both planning artifacts.

The repository uses npm with a version 3 lockfile. Direct dependency declarations currently contain caret or tilde ranges, and the project engine range permits multiple Node.js major versions. GitHub Pages CI already selects Node.js 24 and runs `npm ci` followed by `npm run build`. The lockfile identifies two optional `fsevents` entries with installation scripts; their presence is a validation concern, not evidence that the build requires those scripts.

## Goals / Non-Goals

**Goals:** Make the migration a reviewable configuration and metadata change; preserve the resolved dependency graph; validate the restrictions independently from build success.

**Non-Goals:** Add a package manager, installation wrapper, script approval framework, or new runtime version manager. Application code and existing build commands need no planned changes.

## Decisions

### 1. Store the shared policy in the root `.npmrc`

Set `save-exact=true`, `engine-strict=true`, and `ignore-scripts=true`. Keep the existing CI installation and build commands so local development and CI consume the same project policy. Per-command flags would duplicate configuration and would not cover other developer installation commands.

These settings establish defaults, not an enforcement boundary against deliberate command-line or environment overrides. Do not introduce overrides into the supported installation/build workflow.

### 2. Convert declarations from the existing lockfile

For each entry in `package.json` production and development dependencies, use the exact version from the corresponding root-resolved lockfile package entry. Update the matching declarations in the lockfile's root package metadata. Preserve all resolved package entries, versions, integrity values, and dependency edges.

Directly synchronizing this metadata avoids invoking a fresh dependency resolution that could upgrade transitive packages. Verify the complete resolved graph against a pre-migration snapshot and confirm npm accepts the resulting manifest/lockfile pair through a clean installation. If an entry cannot be mapped unambiguously, resolve that mapping before editing rather than guessing or selecting a newer version.

### 3. Declare Node.js 24 compatibility in project metadata

Set `engines.node` to `>=24.0.0 <25.0.0` in `package.json` and the lockfile's root package metadata. Retain CI's existing Node.js 24 selection. Update the runtime range in `docs/stack.md` to avoid contradicting the README.

An exact runtime version would unnecessarily restrict compatible patch updates. The project range does not guarantee that every Node.js 24 patch satisfies every dependency's own engine declaration; validation uses a Node.js 24 version compatible with the locked graph and records the actual Node.js and npm versions.

### 4. Verify behavior in isolated environments

Use a disposable checkout or temporary project copy for a clean `npm ci` and `npm run build` with the policy active, avoiding reliance on existing installed artifacts. Verify effective values for all three npm settings and compare dependency resolution before and after migration.

Use small local fixture packages in temporary directories to verify exact-version saving, rejection of an incompatible dependency engine, suppression of installation scripts, and explicit script execution without associated pre/post hooks. Use an available unsupported Node.js runtime to verify project engine rejection. Keep fixtures separate from the application manifest and lockfile; record any unavailable runtime checks as unverified rather than claiming they passed.

This provides evidence of policy behavior that a successful build alone cannot establish. No permanent application test suite is needed for this configuration change.

### 5. Document supported workflows and manual preparation

Update the README development section to state the supported runtime, explain each rule, recommend `npm ci` for reproducing the locked environment, and distinguish deliberate dependency changes from reproducible installation. Explain that explicit project scripts still run while their pre/post hooks are suppressed.

Document only manual preparation steps found necessary during validation, including existing explicit browser installation for end-to-end testing. If a dependency genuinely needs preparation, identify and review its specific step; do not recommend globally disabling script suppression or bulk rebuilding all dependencies. Production installation and build must pass with the policy active.

## Risks / Trade-offs

- Installation scripts may provide optional native artifacts → Validate a clean build and relevant development workflows; document any necessary targeted manual preparation.
- Metadata edits can drift from resolved versions → Compare every direct declaration and the complete resolved graph, then require a successful clean installation.
- Previously accepted Node.js versions become unsupported → Document the migration to Node.js 24 and keep CI on that major version.
- Configuration can be overridden by developers or external CI environment settings → Verify effective configuration during validation and keep the documented workflow free of overrides.

## Migration Plan

1. Snapshot the current lockfile's resolved package graph and direct versions.
2. Apply `.npmrc`, exact dependency declarations, and matching manifest/lockfile runtime metadata together.
3. Validate isolated policy behavior and a clean installation/build on compatible Node.js 24; update developer and stack documentation from the results.
4. Deliver configuration, metadata, and documentation as one change. The existing deployment workflow consumes the new policy on its next build.

Rollback consists of reverting the configuration, metadata, and documentation changes together and reinstalling from the restored lockfile. No application data migration is required.
