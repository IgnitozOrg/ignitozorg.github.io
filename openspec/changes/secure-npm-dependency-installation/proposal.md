# Proposal

## Why

Dependency installation currently lacks a shared policy to prevent automatic execution of third-party installation scripts and enforce runtime compatibility. The development team needs predictable dependency versions and consistent installation behavior across local development and CI, as described in the updated IGZ-14 story.

## What Changes

- Establish a version-controlled npm installation policy that saves exact dependency versions, enforces declared engine compatibility, and disables automatic installation scripts.
- Convert all existing direct production and development dependency declarations to the exact versions already resolved in the lockfile, preserving resolved package versions and keeping dependency metadata synchronized.
- **BREAKING**: Restrict the supported Node.js runtime to `>=24.0.0 <25.0.0`; installations outside that range or with dependencies declaring incompatible engines must fail under the project policy.
- **BREAKING**: Stop automatic execution of installation lifecycle scripts. Explicit project commands remain available, without their automatic pre- and post-scripts.
- Require a clean installation and production build to succeed on a compatible Node.js 24 runtime with all installation restrictions active.
- Document the three policy rules, the supported Node.js range, and any necessary manual dependency preparation steps in the development guide.

Scope includes installation policy, existing dependency declarations, runtime compatibility, installation/build validation, and developer documentation. Dependency upgrades, additional security audit tools, and guarantees that dependencies are free of vulnerabilities are outside scope.

## Capabilities

### New Capabilities

- `dependency-management`: Predictable and restricted dependency installation, covering exact direct dependency versions, supported runtime compatibility, suppressed automatic installation scripts, continued build usability, and developer guidance.

### Modified Capabilities

None.

## Impact

The change affects developers' dependency installation and maintenance workflow, dependency metadata, runtime requirements, development documentation, and the existing CI installation/build process. CI already uses Node.js 24. Developers using previously accepted Node.js versions must migrate, and dependencies that rely on installation scripts may require documented manual preparation. Application features and dependency versions remain unchanged.
