# Changelog

## [Unreleased]

### Added

- Header rules in `docs/popup-spec.md`: fixed English subtitle, `.header-icon-btn` (settings gear), `.status-dot`, and the language button order; `popup-common.css` gains `.header-icon-btn` / `.status-dot`.
- UI guideline conformance: dark accent/status colors derived by inverting lightness, `color-scheme` for native controls, `shared/material-icons.js` (inline Material Symbols SVG for content scripts), and the documented exceptions (language flags, theme button previews).
- Shared UI spec for chrome-* extensions (`docs/popup-spec.md`): `popup-common.css` (palette, header, footer, buttons, banner, toggle, font/icon scale), `options-common.css` (sidebar + main options layout), `options-shell.js` and `theme.js`.
- Options page skeleton with General, Appearance and Changelog tabs, version label, policy links and support block; `storage` permission and `storage.onChange` wrapper.

### Changed

- Updated `docs/dev-charter/` to include the new `chrome-extension` topic (`CHROME_EXTENSION_DEV_ENV.md`). `AI_CONTEXT.md`'s Build & Test Commands / Chrome API Rules sections now reference it instead of restating the general dev-env policy (y-marui/dev-charter#133).

### Fixed

- `scripts/release.sh` が `dist/` に残っていた旧バージョンの zip・checksums を GitHub Release に添付してしまう問題を修正。ビルド前に `dist/` を削除するように変更 (Refs y-marui/chrome-library-check-for-zotero#74)
