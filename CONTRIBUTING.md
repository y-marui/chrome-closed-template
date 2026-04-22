Contribution Guidelines

> **This is the reference (English) version.**
> For the canonical (Japanese) version, see CONTRIBUTING-jp.md (create when using this template for a project).

## Setup

```sh
pre-commit install  # required before first commit
```

## Development Flow

1. Create a feature branch from `main` (`feat/`, `fix/`, `docs/`, `chore/` prefix)
2. Make focused, working commits (no WIP commits)
3. Open a pull request and request review
4. Merge only after approval and CI passing

## Naming Conventions

| Target | Rule |
|--------|------|
| Variables / functions / classes | English, camelCase |
| Files / directories | kebab-case |
| Message types (`message-types.js`) | UPPER_SNAKE_CASE |
| Branch names | `type/short-description` (e.g. `feat/add-storage-key`) |

## Code Rules

1. Do not introduce new permissions without discussion — see [Permission Policy](docs/permission-policy.md)
2. Only `shared/storage.js` and `shared/messaging.js` may call Chrome APIs directly
3. Messaging must use `shared/messaging.js`
4. Storage must use `shared/storage.js`
5. No debug `console.log` in production code
6. No TODO / FIXME left in code — implement it or open an issue

## Commits

- Format: Conventional Commits (`feat` / `fix` / `refactor` / `docs` / `chore`)
- Do not commit non-working code (no WIP commits)
- Commit granularity: one logical unit per commit, after verifying it works

## Code Review Checklist

Before approving a pull request, verify:

- [ ] Behavior matches the spec (`docs/specification.md`)
- [ ] No new Chrome permissions added without approval
- [ ] No direct Chrome API calls outside `shared/`
- [ ] No secrets or tokens in code
- [ ] No debug `console.log` left in
- [ ] Tests added or updated as needed
- [ ] `docs/` updated if the change affects architecture or behavior
