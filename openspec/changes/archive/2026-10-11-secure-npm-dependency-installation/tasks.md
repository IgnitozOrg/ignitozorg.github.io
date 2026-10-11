# Tasks

## 1. Shared npm policy

- [x] 1.1 Create the root `.npmrc` with the three agreed settings and verify that `npm config get save-exact`, `npm config get engine-strict`, and `npm config get ignore-scripts` each return `true` from the project root.
- [x] 1.2 Record isolated fixture validation results demonstrating exact-version saving on dependency addition and update, suppression of project and dependency installation hooks, and explicit project script execution without pre/post hooks; verify the saved versions and expected script marker files.
- [x] 1.3 Explain the three npm settings and explicit script behavior in the README development section; verify the guidance matches the effective configuration and fixture results.

## 2. Dependency and runtime metadata

- [x] 2.1 Capture a pre-migration snapshot of direct resolved versions and all non-root lockfile package entries; verify every production and development dependency has an unambiguous root-resolved version.
- [x] 2.2 Convert direct dependency declarations in `package.json` and root lockfile metadata to the captured exact versions; verify both declaration sets match and all non-root lockfile package entries remain unchanged.
- [x] 2.3 Set `engines.node` to `>=24.18.0 <25.0.0` in the manifest and root lockfile metadata; verify both declarations match and CI still selects Node.js 24.
- [x] 2.4 Record engine compatibility checks using a compatible Node.js 24 runtime, an unsupported runtime, and an isolated incompatible dependency fixture; verify incompatible installations fail with engine errors and explicitly record any unavailable runtime checks as unverified.
- [x] 2.5 Update README installation guidance and `docs/stack.md` for Node.js 24, lockfile-based installation, and deliberate exact-version dependency changes; verify both documents agree with project metadata.

## 3. Installation and build integration

- [x] 3.1 Record a clean `npm ci` followed by `npm run build` in a disposable project copy on compatible Node.js 24; verify all three settings remain active, both commands succeed, and dependency metadata and the resolved graph remain unchanged, recording Node.js and npm versions.
- [x] 3.2 Integrate browser preparation into the existing `test:e2e` script and update README guidance to one command; verify `npm run test:e2e -- --list` prepares or reuses browsers and reaches test discovery on Node.js 24.18.0 with script suppression active, and confirm preparation failure prevents discovery.
- [x] 3.3 Review the final diff and recorded validation against every dependency-management scenario; verify no dependency upgrades or unrelated application changes were introduced and run `openspec validate secure-npm-dependency-installation --strict` successfully.

## 4. Minimum runtime refinement

- [x] 4.1 Verify Node.js 24.16.0 is rejected and 24.18.0 is accepted under the updated engine policy; record actual runtime versions and outcomes.

  Validation: isolated packages using the project's engine declaration and `.npmrc`, installed with `npm install --package-lock-only --offline`, rejected Node.js v24.16.0 with `EBADENGINE` and accepted Node.js v24.18.0.
- [x] 4.2 Verify a clean installation and production build on Node.js 24.18.0 with the updated metadata, preserve all resolved package entries, and validate the aligned documentation and OpenSpec artifacts.

  Validation: a disposable project copy with Node.js v24.18.0 and npm 11.16.0 passed `npm ci --offline --cache /tmp/igz-install-cache --no-audit --no-fund` and `npm run build`; all three npm policy settings remained `true` and installation left the lockfile unchanged. Every non-root lockfile entry matches the pre-refinement version. Manifest, root lockfile metadata, README, stack documentation, and planning artifacts agree on `>=24.18.0 <25.0.0`; `openspec validate secure-npm-dependency-installation --strict` and `git diff --check` passed. Existing peer-dependency and deprecated-package warnings remain; application E2E execution is not part of this runtime refinement.
