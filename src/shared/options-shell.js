/**
 * Shared behavior for the sidebar + main options layout (see docs/popup-spec.md).
 * Keep this file identical across chrome-* repositories.
 */

/**
 * Wire up sidebar navigation: each `.nav-item[data-page="x"]` shows `#page-x`.
 * @param {(page: string) => void} [onChange] called after the page switches
 */
export function initOptionsNav(onChange) {
  const items = document.querySelectorAll(".nav-item[data-page]");
  const select = (page) => {
    items.forEach((el) => el.classList.toggle("active", el.dataset.page === page));
    document.querySelectorAll(".page").forEach((el) => {
      el.classList.toggle("active", el.id === `page-${page}`);
    });
    onChange?.(page);
  };
  items.forEach((el) => el.addEventListener("click", () => select(el.dataset.page)));
}

/** Fill every `[data-version]` element with "v<manifest version>". */
export function showVersion() {
  const version = chrome.runtime.getManifest().version;
  document.querySelectorAll("[data-version]").forEach((el) => {
    el.textContent = `v${version}`;
  });
}

/**
 * Render changelog entries into `container`.
 * An entry is `{version, date, items: [{tag, desc}]}`; the flat form
 * `{version, date, tag, desc}` is also accepted.
 * @param {HTMLElement} container
 * @param {{version: string, date: string, tag?: string, desc?: string, items?: {tag: string, desc: string}[]}[]} entries
 * @param {Record<string, string>} [tagLabels] display text per tag (defaults to the tag itself)
 */
export function renderChangelog(container, entries, tagLabels = {}) {
  container.replaceChildren();
  for (const entry of entries) {
    const row = document.createElement("div");
    row.className = "changelog-row";

    const head = document.createElement("div");
    head.className = "changelog-version-row";
    const version = document.createElement("span");
    version.className = "changelog-version";
    version.textContent = `v${entry.version}`;
    const date = document.createElement("span");
    date.className = "changelog-date";
    date.textContent = entry.date;
    head.append(version, date);
    row.append(head);

    const items = entry.items ?? [{ tag: entry.tag, desc: entry.desc }];
    for (const item of items) {
      const desc = document.createElement("div");
      desc.className = "changelog-desc";
      const tag = document.createElement("span");
      tag.className = `changelog-tag changelog-tag-${item.tag}`;
      tag.textContent = tagLabels[item.tag] ?? item.tag;
      const text = document.createElement("span");
      text.textContent = item.desc;
      desc.append(tag, text);
      row.append(desc);
    }
    container.append(row);
  }
}
