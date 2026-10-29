import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { checkManifestNames } from "../../scripts/lib/manifest-names.js"

function assert(cond, msg){
  if(!cond){
    throw new Error(msg)
  }
}

function fixture(manifest, locales = {}){
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "manifest-names-"))
  fs.writeFileSync(path.join(root, "manifest.json"), JSON.stringify(manifest))
  for(const [locale, messages] of Object.entries(locales)){
    fs.mkdirSync(path.join(root, "_locales", locale), { recursive: true })
    fs.writeFileSync(path.join(root, "_locales", locale, "messages.json"), JSON.stringify(messages))
  }
  return root
}

const msg = (message) => ({ message })
const chars = (n) => "a".repeat(n)

// 実際の manifest は error だけを検査する（warning は Edge など掲載先次第の注意なので失敗にしない）
const actual = checkManifestNames(path.resolve(path.dirname(new URL(import.meta.url).pathname), "../.."))
assert(actual.errors.length === 0, `manifest name should have no errors: ${actual.errors.join(", ")}`)

// テンプレートのプレースホルダのままの名前は error も warning も出ない
let r = checkManifestNames(fixture({ name: "[APP_NAME] \u2013 [TAGLINE]", short_name: "[APP_NAME]" }))
assert(r.errors.length === 0 && r.warnings.length === 0, "template placeholders should pass")

// name: 45 以下は OK、46〜50 は warning、51 以上は error
r = checkManifestNames(fixture({ name: chars(45), short_name: chars(12) }))
assert(r.errors.length === 0 && r.warnings.length === 0, "45/12 chars should pass")
r = checkManifestNames(fixture({ name: chars(46) }))
assert(r.errors.length === 0 && r.warnings.length === 1, "46 chars should warn")
r = checkManifestNames(fixture({ name: chars(50) }))
assert(r.errors.length === 0 && r.warnings.length === 1, "50 chars should warn only")
r = checkManifestNames(fixture({ name: chars(51) }))
assert(r.errors.length === 1, "51 chars should error")

// short_name: 13 文字以上は warning
r = checkManifestNames(fixture({ name: chars(10), short_name: chars(13) }))
assert(r.errors.length === 0 && r.warnings.length === 1, "13-char short_name should warn")

// __MSG_xxx__ は全ロケールで展開して検査する
r = checkManifestNames(fixture(
  { name: "__MSG_appName__", short_name: "__MSG_appShortName__", default_locale: "en" },
  {
    en: { appName: msg(chars(40)), appShortName: msg("Short") },
    ja: { appName: msg(chars(51)), appShortName: msg("Short") },
  },
))
assert(r.errors.length === 1 && r.errors[0].includes("[ja]"), "over-limit translated name should error")

// 展開できない場合は error
r = checkManifestNames(fixture({ name: "__MSG_appName__" }))
assert(r.errors.length === 1, "missing _locales should error")
r = checkManifestNames(fixture({ name: "__MSG_appName__" }, { en: {} }))
assert(r.errors.length === 1, "missing message key should error")

console.log("manifest-names tests passed")
