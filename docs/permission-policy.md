Use least privilege.

- Avoid `<all_urls>` unless required. The template uses `"https://*/*"` as a starting point — narrow it to the specific domains your extension targets.
- Keep `permissions` and `host_permissions` in `manifest.json` as empty as possible; add entries only when a feature requires them.
- Review the [Chrome permission warnings](https://developer.chrome.com/docs/extensions/reference/permissions-list) before adding any new permission.
