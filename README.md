# Chrome Extension Template

> **This is the reference (English) version.**
> For the canonical (Japanese) version, see [README-jp.md](README-jp.md).

AI-friendly Chrome Extension template designed for:

- Claude Code
- GitHub Copilot
- small teams (1–3 developers)

## Load extension

chrome://extensions → Developer Mode → Load Unpacked (select project root)

## Development

```sh
npm test   # run unit tests
```

### Files to edit first

| File | Purpose |
|------|---------|
| `manifest.json` | Extension name, version, permissions, content_scripts matches |
| `src/content/content.js` | Logic injected into web pages |
| `src/popup/popup.html` / `popup.js` | Popup UI and actions |
| `src/shared/message-types.js` | Add message types for inter-component communication |
| `public/icons/` | Replace placeholder 1×1px icons with 16×16, 48×48, 128×128 PNGs |

## Release

1. Update version in `manifest.json`
2. Run `python3 build_extension_zip.py`
3. Upload `extension.zip` to Chrome Web Store

## Docs

- [Architecture](docs/architecture.md)
- [AI Guidelines](docs/ai-guidelines.md)
- [Permission Policy](docs/permission-policy.md)
- [Security Checklist](docs/security-checklist.md)
- [Release Process](docs/release-process.md)
- [Maintenance Guide](docs/maintenance-guide.md)
- [Design Decisions](docs/design-decisions.md)
