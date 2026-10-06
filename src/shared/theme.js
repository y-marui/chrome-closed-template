/**
 * Theme preference (light / dark / system) shared by the popup and options page.
 * Sets <html data-theme="light|dark"> as popup-common.css expects.
 * Keep this file identical across chrome-* repositories that have no theme setting of their own.
 * Storage goes through shared/storage.js (the Chrome API wrapper).
 */

import { get, set, onChange } from "./storage.js";

const KEY = "theme";
const THEMES = ["light", "dark", "system"];

export async function getTheme() {
  const stored = await get(KEY);
  return THEMES.includes(stored) ? stored : "system";
}

export async function setTheme(theme) {
  await set(KEY, theme);
}

export function applyTheme(theme) {
  const dark = theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

/**
 * Apply the stored theme and keep following changes (system setting, other pages).
 * @returns {Promise<string>} the current theme preference
 */
export async function initTheme() {
  let theme = await getTheme();
  applyTheme(theme);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (theme === "system") applyTheme("system");
  });
  onChange(KEY, async () => {
    theme = await getTheme();
    applyTheme(theme);
  });
  return theme;
}

/** Wire the `.theme-btn[data-theme-value]` buttons of the Appearance page. */
export async function bindThemeButtons() {
  const buttons = document.querySelectorAll(".theme-btn[data-theme-value]");
  const mark = (theme) => {
    buttons.forEach((b) => b.classList.toggle("active", b.dataset.themeValue === theme));
  };
  mark(await initTheme());
  buttons.forEach((b) => {
    b.addEventListener("click", async () => {
      await setTheme(b.dataset.themeValue);
      mark(b.dataset.themeValue);
    });
  });
}
