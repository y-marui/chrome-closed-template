Contribution Guidelines

> **This is the reference (English) version.**
> For the canonical (Japanese) version, see CONTRIBUTING-jp.md (create when using this template for a project).

For build setup, development flow, and code rules, see [DEVELOPING.md](DEVELOPING.md).

## How to Contribute

1. Open an Issue first to discuss the change
2. Fork the repository and create a feature branch
3. Follow the code rules in [DEVELOPING.md](DEVELOPING.md)
4. Open a pull request referencing the Issue

## Code Review Checklist

Before approving a pull request, verify:

- [ ] Behavior matches the spec (`docs/specification.md`)
- [ ] No new Chrome permissions added without approval
- [ ] No direct Chrome API calls outside `shared/`
- [ ] No secrets or tokens in code
- [ ] No debug `console.log` left in
- [ ] Tests added or updated as needed
- [ ] `docs/` updated if the change affects architecture or behavior
