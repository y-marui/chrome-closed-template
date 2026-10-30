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
  - The title is the extension's app name and the description is a short English tagline. Both are
    **fixed English text, never localized** (no `data-i18n`, no `_locales` key), and identical in the popup and in
    the options sidebar header. Do not set them from JS.
  - The canonical name (`manifest.json`'s `name`) is `<app name> – <tagline>` (en dash U+2013 with a space on
    each side, English regardless of the display language), and `short_name` is `<app name>` alone. Without
    `short_name` the full tagline can show up in space-constrained browser UI, such as the Search Engines
    settings page for an extension that registers an `omnibox` keyword.
  - Keep the tagline short (2–3 words) and avoid repeating words already in the app name
    (e.g. `Duplicate Detection`, `Route Your Searches`).
  - Length limits of the store listing name (`name`, the whole `<app name> – <tagline>`):

    | Store | Limit |
    |---|---|
    | Chrome Web Store | 75 chars |
    | Firefox (addons.mozilla.org) | 50 chars (older docs say 45, but the submission error is at 50) |
    | Microsoft Edge Add-ons | 45 chars |

    Aim for **50 chars or fewer** for the whole `name` because the extension is also published on Firefox;
    if it is also published on Edge, **45 chars or fewer**. A 2–3 word tagline can still push a long app name
    over the limit, so always count the full string. `short_name` should be **12 chars or fewer** (Chrome
    recommends it; not enforced). With `_locales`, every locale's expanded string must meet these limits, since
    AMO also checks translated names.
  - `scripts/validate-store-assets.js` (`npm run validate:store`, also run by `npm test` through
    `scripts/lib/manifest-names.js`) counts them: `name` over 50 is an error, over 45 a warning, and
    `short_name` over 12 a warning. `__MSG_xxx__` is expanded with every `_locales/*/messages.json`.
  - In this template the three places carry the placeholders `[APP_NAME]` and `[TAGLINE]`: `manifest.json`
    (`name`, `short_name`), `src/popup/popup.html` and `src/options/options.html` (`<title>`, `.header-title`,
    `.header-desc`). Replace all of them right after creating a project from the template; `npm test`
    (`test/unit/placeholders.test.js`) fails while any remain, or when `name` / `short_name` / the headers
    disagree. The template repository itself is exempt (it has `README_TEMPLATE.md`).
  - The template writes these strings directly into `manifest.json` and keeps no `_locales`. If the extension
    later moves to `_locales`, set `name` to `__MSG_appName__` and `short_name` to `__MSG_appShortName__`, and
    give `appName` (`"<app name> – <tagline>"`) and `appShortName` (`"<app name>"`) the **same English `message`
    in every locale** (do not translate them; this is a different string from `appTagline`, a longer,
    translated subtitle some products show). Add `default_locale` too. The header HTML stays hard-coded English.
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
  "If it's helpful, I'd love your support via Buy Me a Coffee! ☕"
  (GitHub Sponsors ends with ❤️).
- Material Symbols Outlined is loaded from Google Fonts in the page `<head>`.
- Links: `https://url.invalid/to/hp`, `https://url.invalid/to/privacy`, and `https://url.invalid/to/terms` are deliberately invalid placeholders for the product homepage, privacy policy, and terms. Replace them in both popup and options with the project's public URLs and verify reachability before submission. Do not substitute the template repository or a private repository URL. Sponsor links use the same values as the README.

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
  - `.sidebar-support`: support message (`supportMsg`: "If it's helpful, I'd love your support!" in each language,
    followed by the Material `coffee` icon), Buy Me a Coffee banner (`.bmc-img`) and a GitHub Sponsors `.sponsor-btn`.
    GitHub has no banner image; the button is plain CSS (an official iframe exists at
    `https://github.com/sponsors/<user>/button` but it loads a github.com page and ignores dark mode).
- Main: one `.page#page-<name>` per nav item; page title `.page-title`, sections as `.card-title` + `.card`.
- Tabs: every extension has **General** (settings), **Appearance** (theme, and language where the extension is localized) and **Changelog** (release history). Extensions with many
  settings may split General into several tabs, but Changelog is always last.
- Changelog data: `{version, date, items: [{tag, desc}]}` with the shared tag set `added`, `changed`, `improved`, `fixed`, `removed`, `security`, `chore`
  (all seven are styled in `options-common.css` and translated in every localized extension, whether or not a release uses them yet).
  Only the tag labels are translated; the `desc` text is written in English in every extension (see `LANGUAGE_POLICY.md`).

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
