# Chrome Extension Template

> **This is the reference (English) version.**
> The canonical (Japanese) version is [README-jp.md](README-jp.md).

[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](LICENSE)
[![CI](https://github.com/y-marui/chrome-closed-template/actions/workflows/ci.yml/badge.svg)](https://github.com/y-marui/chrome-closed-template/actions/workflows/ci.yml)
[![Charter Check](https://github.com/y-marui/chrome-closed-template/actions/workflows/dev-charter-check.yml/badge.svg)](https://github.com/y-marui/chrome-closed-template/actions/workflows/dev-charter-check.yml)

A Chrome Extension template for AI-assisted development (Claude Code / GitHub Copilot). Designed for small closed teams (1–3 developers).

| Field | Details |
|-------|---------|
| Target | Chrome Extension (Manifest V3) |
| Team size | Small team (1–3 developers) |
| Primary language | Japanese |
| AI tools | Claude Code / GitHub Copilot / Gemini CLI |
| Runtime | Chrome (latest) |

## Features

- ✅ Manifest V3 (service worker based)
- ✅ Clear 3-layer architecture (background / content / popup)
- ✅ Shared Chrome API wrappers (messaging.js / storage.js)
- ✅ Unit test setup (Node.js test runner)
- ✅ pre-commit security hooks (gitleaks, secret detection)
- ✅ `npm run build` generates extension.zip automatically
- ✅ AI context files included (AI_CONTEXT.md / CLAUDE.md)

## Quick Start

### 1. Use this template

Click "Use this template" to create a new repository, then clone it.

```sh
git clone https://github.com/[your-username]/[your-repo].git
cd [your-repo]
```

### 2. Rename the template README files

```sh
mv README.md README_ORIGINAL.md   # back up the template README
mv README_TEMPLATE.md README.md   # use the project README template
mv README_TEMPLATE-jp.md README-jp.md  # use the Japanese project README template
```

Then update the placeholders (`{user}`, `{repo}`, `{workflow}`, `[YEAR]`, `[AUTHOR]`, `[USERNAME]`, `[BMC_USERNAME]`) in `README.md`, `README-jp.md`, and `LICENSE`.

### 3. Set up environment

Requires Node.js v20+ and [pre-commit](https://pre-commit.com).

```sh
pre-commit install          # install git hooks
pre-commit run --all-files  # verify hooks
npm test                    # verify tests
```

### 3. Load extension

1. Open `chrome://extensions` in Chrome
2. Enable Developer Mode
3. Click "Load Unpacked" and select the project root

## Commands

```sh
npm test                    # run unit tests
npm run build               # generate extension.zip
pre-commit run --all-files  # run all security/quality hooks
```

## Project Structure

```
chrome-extension-template/
├── src/
│   ├── background/       lifecycle logic (service-worker.js)
│   ├── content/          logic injected into web pages
│   ├── popup/            toolbar popup UI
│   └── shared/           Chrome API wrappers and utilities
├── public/icons/         extension icons (16 / 48 / 128px)
├── test/unit/            unit tests
├── docs/                 documentation
├── manifest.json         extension manifest (MV3)
├── DEVELOPING.md         build & code rules (developers)
├── README_TEMPLATE.md    project README template (rename after setup)
└── AI_CONTEXT.md         context file for AI tools
```

## Customization

Files to edit when starting a new project from this template:

| File | Purpose |
|------|---------|
| `manifest.json` | Extension name, version, permissions, content_scripts matches |
| `src/content/content.js` | Logic injected into web pages |
| `src/popup/popup.html` / `popup.js` | Popup UI and actions |
| `src/shared/message-types.js` | Message types for inter-component communication |
| `public/icons/` | Replace placeholder 1×1px icons with 16×16, 48×48, 128×128 PNGs |

## AI-Assisted Development

This template is designed for development with Claude Code and GitHub Copilot.

| AI Tool | Role |
|---------|------|
| Claude Code | Architecture, large-scale changes, project setup |
| GitHub Copilot | Small fixes, test writing, coding assistance |
| Gemini CLI | Document generation, translation |

See [AI_CONTEXT.md](AI_CONTEXT.md) for details.

## Docs

| Document | Description |
|---|---|
| [Architecture](docs/architecture.md) | Entry points, component structure, and edit guide |
| [File Map](docs/file-map.md) | File-level dependency map |
| [Specification](docs/specification.md) | Functional spec, behavior definitions, and data flow |
| [UI Design](docs/ui-design.md) | Color palette and icon guidelines |
| [Permission Policy](docs/permission-policy.md) | Criteria for adding Chrome permissions |
| [Security Checklist](docs/security-checklist.md) | Pre-release checklist |
| [Release Process](docs/release-process.md) | Chrome Web Store submission steps |
| [Dev Charter](docs/dev-charter/README.md) | Cross-project development policies |

## Privacy Policy

Chrome Web Store requires a privacy policy URL when publishing an extension.
This template does not include a hosted policy page; set one up before releasing:

1. Create a privacy policy page (e.g. GitHub Pages, a Gist, or your own site).
2. Add `"privacy_policy_url": "https://example.com/privacy-policy"` to `manifest.json` if needed, or provide the URL during Chrome Web Store submission.

## Release

1. Prepare a publicly accessible privacy policy page and note its URL.
2. Update version in `manifest.json`.
3. Run `npm run build` (generates `extension.zip`).
4. Upload `extension.zip` to Chrome Web Store and enter the privacy policy URL during submission.

## License

Copyright (c) [YEAR] [AUTHOR]. All Rights Reserved — see [LICENSE](LICENSE) for details.
