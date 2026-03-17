Contribution Guidelines

> **This is the reference (English) version.**
> For the canonical (Japanese) version, see CONTRIBUTING-jp.md (create when using this template for a project).

## Setup

```sh
pre-commit install  # required before first commit
```

## Rules

1. Do not introduce new permissions without discussion
2. Only `shared/storage.js` and `shared/messaging.js` may call Chrome APIs directly; other shared modules must remain Chrome API free
3. Messaging must use shared/messaging.js
4. Storage must use shared/storage.js

## Commits

- Format: Conventional Commits (`feat` / `fix` / `refactor` / `docs` / `chore`)
- Do not commit non-working code (no WIP commits)
