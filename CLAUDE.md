# Chrome Extension Template

AI-friendly Chrome Extension template for small teams (1–3 developers).

## Commands

```sh
npm test       # run unit tests
npm run build  # create extension.zip for distribution
```

## Key rules

- Only `shared/storage.js` and `shared/messaging.js` may call Chrome APIs. All other shared modules must remain Chrome API free.
- Background lifecycle events (`chrome.runtime.onInstalled`, etc.) may be called directly in `src/background/service-worker.js`. All other Chrome API usage must go through the shared wrappers.
- Messaging via `shared/messaging.js` — do not call `chrome.runtime.sendMessage` directly from popup or content scripts.
- Storage via `shared/storage.js` — do not call `chrome.storage` directly from popup or content scripts.
- Do not add `permissions` or `host_permissions` without reviewing `docs/permission-policy.md`.
- No remote code execution. No inline scripts or `onclick` attributes.

## Docs

- [Architecture](docs/architecture.md)
- [AI Guidelines](docs/ai-guidelines.md)
- [Permission Policy](docs/permission-policy.md)
- [Security Checklist](docs/security-checklist.md)
- [Maintenance Guide](docs/maintenance-guide.md)
