import { initOptionsNav, showVersion, renderChangelog } from "../shared/options-shell.js";
import { bindThemeButtons } from "../shared/theme.js";

/** @type {{version: string, date: string, items: {tag: string, desc: string}[]}[]} */
const CHANGELOG = [
  { version: "0.1.0", date: "2026-01-01", items: [{ tag: "added", desc: "Initial release" }] }
];

initOptionsNav();
bindThemeButtons();
showVersion();
renderChangelog(document.getElementById("changelogList"), CHANGELOG);
