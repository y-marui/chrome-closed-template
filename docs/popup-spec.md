# Popup Layout Spec

All `chrome-*` extensions share the same popup chrome (header, footer, font and icon scale).
The single source of truth is `src/popup/popup-common.css` in this template. Copy it as-is into
each extension (keep the file identical across repositories) and add it to `STATIC_INCLUDE` in
`scripts/build.js`.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--popup-width` | 310px | popup width |
| `--fs-caption` | 10px | header description, meta, badges |
| `--fs-small` | 11px | secondary text, buttons, labels |
| `--fs-body` | 12px | primary UI text |
| `--fs-base` | 13px | body default |
| `--fs-title` | 14px | header title |
| `--icon-sm` / `--icon-md` / `--icon-lg` | 16 / 18 / 22px | Material Symbols (default / emphasis / footer) |
| `--header-height`, `--header-icon` | 56px, 32px | header |
| `--footer-height`, `--footer-btn` | 44px, 32px | footer |
| `--btn-height`, `--btn-radius` | 28px, 7px | buttons and inputs (min-height; font `--fs-small`, `font-family: inherit`) |

Content should use the `--fs-*` tokens instead of hard-coded font sizes.

## Theme and palette

`popup-common.css` defines the whole palette (`--bg`, `--bg2`, `--bg3`, `--border`, `--text`, `--text-em`,
`--text2`, `--text3`, `--accent*`, `--green*`, `--red*`, `--orange*`, `--gray-*`, `--hover`).
Light by default; dark when `<html data-theme="dark">`. Pages that never set `data-theme` follow
`prefers-color-scheme`. Pages that manage the theme in JS must always set `data-theme` to
`light` or `dark` (never remove the attribute).

## Content components

| Class | Use |
|---|---|
| `.section` | padded block; consecutive sections get a divider |
| `.banner` + `.green/.red/.orange/.gray`, `.banner-text` | status line with icon |
| `.btn`, `.btn-row` | full-width button; `.btn-row` puts buttons side by side |
| `.setting-row`, `.setting-label`, `.toggle` | label + switch row |
| `.text-meta`, `.text-error` | secondary / error text |
| `.hidden` | hide an element |

Extension-specific styles go in the page or `popup.css`, using the tokens above.

## Markup

- Header: `.header` > `img`, `.header-title`, `.header-desc`, optional `.header-right`.
- Footer: `.footer` > `.footer-btn` links, right-aligned, icon only (title/aria-label set), in this order:
  Homepage (`home`), Privacy Policy (`verified_user`), Terms of Service (`description`),
  Buy Me a Coffee (`local_cafe`), GitHub Sponsors (`favorite`).
- Material Symbols Outlined is loaded from Google Fonts in the page `<head>`.
- Links: `https://y-marui.github.io/y-marui/products/<repo>/` (`privacy/`, `terms/`). Until those pages
  exist, link to the repository page. Sponsor links use the same values as the README.

## Options page

Sidebar + main layout. Files: `src/options/options-common.css` (layout, loaded after
`popup-common.css`) and `src/shared/options-shell.js` (`initOptionsNav`, `showVersion`,
`renderChangelog`). Both are identical across repositories; add them to `STATIC_INCLUDE`.
`src/options/options.html` in this template is the reference markup.

- Sidebar (240px), top to bottom:
  - `a.header` (same as the popup header, linked to the homepage);
  - `.sidebar-nav`: `.nav-item[data-page]` tabs, then external links (Privacy Policy, Terms of Service) as
    `a.nav-item` with a trailing `.nav-ext` icon;
  - `.sidebar-version[data-version]` (filled from `manifest.version`);
  - `.sidebar-support`: support message, Buy Me a Coffee banner (`.bmc-img`) and a GitHub Sponsors `.sponsor-btn`.
    GitHub has no banner image; the button is plain CSS (an official iframe exists at
    `https://github.com/sponsors/<user>/button` but it loads a github.com page and ignores dark mode).
- Main: one `.page#page-<name>` per nav item; page title `.page-title`, sections as `.card-title` + `.card`.
- Tabs: every extension has **General** (all settings) and **Changelog** (release history). Extensions with many
  settings may split General into several tabs, but Changelog is always last.
- Changelog data: `{version, date, items: [{tag, desc}]}` with tags `added`, `fixed`, `improved`, `changed`, `chore`.
