**Safe to edit freely:**
- `src/popup/` — UI changes have no side effects on other components
- `src/content/` — page interaction logic
- `src/shared/utils.js` — pure functions with no Chrome API dependency

**Edit with care:**
- `src/background/` — errors here will break the entire extension silently
- `manifest.json` permissions — any addition requires security review (see docs/permission-policy.md)
