# Tasks

## 1. Shared npm policy

- [x] 1.1 Create the root `.npmrc` with the three agreed settings and verify that `npm config get save-exact`, `npm config get engine-strict`, and `npm config get ignore-scripts` each return `true` from the project root.
- [x] 1.2 Record isolated fixture validation results demonstrating exact-version saving on dependency addition and update, suppression of project and dependency installation hooks, and explicit project script execution without pre/post hooks; verify the saved versions and expected script marker files.
- [x] 1.3 Explain the three npm settings and explicit script behavior in the README development section; verify the guidance matches the effective configuration and fixture results.

## 2. Dependency and runtime metadata

- [x] 2.1 Capture a pre-migration snapshot of direct resolved versions and all non-root lockfile package entries; verify every production and development dependency has an unambiguous root-resolved version.
- [x] 2.2 Convert direct dependency declarations in `package.json` and root lockfile metadata to the captured exact versions; verify both declaration sets match and all non-root lockfile package entries remain unchanged.
- [x] 2.3 Set `engines.node` to `>=24.0.0 <25.0.0` in the manifest and root lockfile metadata; verify both declarations match and CI still selects Node.js 24.
- [x] 2.4 Record engine compatibility checks using a compatible Node.js 24 runtime, an unsupported runtime, and an isolated incompatible dependency fixture; verify incompatible installations fail with engine errors and explicitly record any unavailable runtime checks as unverified.
- [x] 2.5 Update README installation guidance and `docs/stack.md` for Node.js 24, lockfile-based installation, and deliberate exact-version dependency changes; verify both documents agree with project metadata.

## 3. Installation and build integration

- [x] 3.1 Record a clean `npm ci` followed by `npm run build` in a disposable project copy on compatible Node.js 24; verify all three settings remain active, both commands succeed, and dependency metadata and the resolved graph remain unchanged, recording Node.js and npm versions.
- [ ] 3.2 Document any targeted manual preparation found necessary for supported development workflows in the README, retaining explicit browser installation guidance; verify the documented steps work with script suppression active and do not introduce policy overrides into production installation or build.
- [ ] 3.3 Review the final diff and recorded validation against every dependency-management scenario; verify no dependency upgrades or unrelated application changes were introduced and run `openspec validate secure-npm-dependency-installation --strict` successfully.
