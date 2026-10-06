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

- Header: `.header` > `img`, `.header-title`, `.header-desc`, `.header-right` (optional on the popup, see below).
  - The title is the extension's display name and the description is a short English tagline. Both are
    **fixed English text, never localized** (no `data-i18n`, no `_locales` key), and identical in the popup and in
    the options sidebar header. Do not set them from JS.
  - Actions in the header (the settings gear, mode indicators) go in `.header-right` as
    `button.header-icon-btn` > `.ms`, with `title` / `aria-label` (localized). Do not restyle them per extension:
    the button size, `--text3` colour, hover and `--icon-md` icon come from `popup-common.css`.
  - A status indicator is `.status-dot` (10px, with an 8px side margin so it takes the same 26px slot as an icon button) as the first item of `.header-right`, with colour classes
    `green` (ok), `accent` (active), `orange` (warning) and `red` (error / blocking); no class means idle (grey).
    Its tooltip is the native `title` attribute (localized); do not build custom tooltips.
  - A popup whose settings live on the options page must have a settings gear (`settings` icon,
    `chrome.runtime.openOptionsPage()`) as the last item of `.header-right`.
- Footer: `.footer` > `.footer-btn` links, right-aligned, icon only (title/aria-label set), in this order:
  Homepage (`home`), Privacy Policy (`verified_user`), Terms of Service (`description`),
  Buy Me a Coffee (`local_cafe`), GitHub Sponsors (`favorite`). The two support buttons carry a hint
  (`title` and `aria-label`, `supportBmc` / `supportSponsors`) that names the service, e.g.
  "If it's helpful, I'd love your support via Buy Me a Coffee!".
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
  - `.sidebar-version[data-app-version]` ("<extension name> v<manifest version>");
  - `.sidebar-support` > `.support-links` holds two `.support-item`s, each a hint message above its button:
    `supportBmc` ("If it's helpful, I'd love your support via Buy Me a Coffee!" in each language, followed by the
    Material `coffee` icon) above the Buy Me a Coffee banner (`.bmc-img`), and `supportSponsors` (same wording with
    GitHub Sponsors, followed by a pink filled `favorite` icon) above the GitHub Sponsors `.sponsor-btn`.
    GitHub has no banner image; the button is plain CSS (an official iframe exists at
    `https://github.com/sponsors/<user>/button` but it loads a github.com page and ignores dark mode).
- Main: one `.page#page-<name>` per nav item; page title `.page-title`, sections as `.card-title` + `.card`.
- Tabs: every extension has **General** (settings), **Appearance** (theme, and language where the extension is localized) and **Changelog** (release history). Extensions with many
  settings may split General into several tabs, but Changelog is always last.
- Changelog data: `{version, date, items: [{tag, desc}]}` with tags `added`, `fixed`, `improved`, `changed`, `chore`.

### Appearance tab

Theme buttons (`.theme-btns` / `.theme-btn[data-theme-value]`) and language buttons (`.lang-btns` / `.lang-btn`)
come from `options-common.css`. The Light and Dark buttons are always rendered as previews with fixed colors
(`--preview-light-*`, `--preview-dark-*`): the dark fill is charcoal (`#2b2b2d`) and its text is the default text
color `#4e454a` with lightness inverted (`#bab1b6`). Do not put `data-theme` on the buttons themselves, because
`[data-theme="dark"]` re-themes any element that carries it.

Extensions without their own theme setting use `src/shared/theme.js` (`initTheme()` in every page,
`bindThemeButtons()` on the Appearance page); the preference is stored in `chrome.storage.local` under `theme`
and needs the `storage` permission. The language selector is only offered by localized extensions.

The language buttons are always in this order: System, 日本語, English, 简体中文, हिन्दी, Español, Français, Português
(the order of dev-charter `LOCALIZATION_POLICY.md`). System is `<span class="ms">language</span>` + the localized
"System" label; every other button is the flag of the language's country of origin + its endonym, not translated
(Hindi is `हिन्दी`). The flags are the only emoji allowed in the UI.

### Main area components

Options pages reuse the popup palette and these classes: `.page-title`, `.card-title` (placed above its `.card`),
`.card` (rows) or `.card card-pad` (free-form content), `.setting-row` / `.setting-info` / `.setting-name` /
`.setting-sub`, `.toggle`, `.btn` (`.btn-primary` for the main action), `.field`. Inputs and choice buttons are
28px high (`--btn-height`) with 7px radius. Monospace text (ids, domains, times) uses `--font-mono`; no web fonts
other than Material Symbols are loaded.

### Spacing and radius scale (main area)

- Vertical rhythm: header to first card title 18px, card title to card 8px, card to next card title 22px,
  card to the action row (`.btn-row`) 18px. Tokens: `--gap-lead`, `--gap-section`, `--gap-inner`.
- Row cards (`.card` with `.setting-row`): each row has its own 14px 16px padding and a divider.
- Free-form cards (`.card.card-pad`): 14px 16px padding and 12px between blocks (`.card-pad > * + *`);
  never add per-element margins. Notes use `.card-note`, a divided sub-section uses `.card-divider` +
  `.card-sublabel`. If the card needs a leading note inside a row card, `.card > .card-note` adds its own padding.
- Radius: 4px chips (tags, badges), 7px (`--btn-radius`) controls, tiles and banners, 12px cards, 20px pills.
- Font sizes come from the `--fs-*` scale; only the stat numbers (28px) and decorative icons are outside it.

## UI guideline conformance

- Palette: light `#FFFFFF` / `#4e454a` / `#000000`, dark `#000000` / `#bab1b6` / `#FFFFFF`. The dark accent and status
  colors keep hue and saturation of the light ones with lightness inverted (accent `#4091e5`, green `#85e5a7`,
  red `#e34646`, orange `#f6954b`).
- Native controls follow the theme through `color-scheme` (set with the palette in `popup-common.css`).
- No Unicode emoji in UI parts, except the country flags on language buttons (see dev-charter `UI_GUIDELINES.md`,
  Exceptions). Content scripts injected into other sites draw Material Symbols with `src/shared/material-icons.js`
  (inline SVG, `currentColor`) instead of emoji.
