import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

// アプリ名・タグラインのプレースホルダが、テンプレートから作った拡張に残っていないことを検証する。
// README_TEMPLATE.md を持つリポジトリはテンプレート自身なので、意図的に残してあるものとして対象外にする
// （scripts/check-readme-placeholders.sh と同じ設計）。
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const PLACEHOLDERS = ["[APP_NAME]", "[TAGLINE]"]
const FILES = ["manifest.json", "src/popup/popup.html", "src/options/options.html"]
const MESSAGE_PATTERN = /^__MSG_(.+)__$/

function assert(cond, msg){
  if(!cond){
    throw new Error(msg)
  }
}

function resolveManifestNames(manifest, root){
  const nameKey = MESSAGE_PATTERN.exec(manifest.name ?? "")?.[1]
  const shortNameKey = MESSAGE_PATTERN.exec(manifest.short_name ?? "")?.[1]
  if(!nameKey && !shortNameKey){
    return { name: manifest.name, shortName: manifest.short_name }
  }

  const localesDir = path.join(root, "_locales")
  assert(manifest.default_locale, "manifest.default_locale がありません")
  assert(fs.existsSync(localesDir), "_locales が見つかりません")
  const locales = fs.readdirSync(localesDir).filter((locale) =>
    fs.existsSync(path.join(localesDir, locale, "messages.json")))
  assert(locales.includes(manifest.default_locale), "default_locale の messages.json がありません")

  const resolve = (locale, key, fallback) => {
    if(!key){
      return fallback
    }
    const messages = JSON.parse(fs.readFileSync(path.join(localesDir, locale, "messages.json"), "utf-8"))
    const message = messages[key]?.message
    assert(typeof message === "string", `${locale}: メッセージキー ${key} がありません`)
    return message
  }
  const defaultNames = {
    name: resolve(manifest.default_locale, nameKey, manifest.name),
    shortName: resolve(manifest.default_locale, shortNameKey, manifest.short_name),
  }
  for(const locale of locales){
    assert(resolve(locale, nameKey, manifest.name) === defaultNames.name,
      `${locale}: manifest.name のメッセージが default_locale と一致しません`)
    assert(resolve(locale, shortNameKey, manifest.short_name) === defaultNames.shortName,
      `${locale}: manifest.short_name のメッセージが default_locale と一致しません`)
  }
  return defaultNames
}

function checkProject(root){
  for(const file of FILES){
    const text = fs.readFileSync(path.join(root, file), "utf-8")
    for(const placeholder of PLACEHOLDERS){
      assert(!text.includes(placeholder), `${file} にプレースホルダ ${placeholder} が残っています`)
    }
  }

  // 規約: name は "<アプリ名> – <タグライン>"（en dash U+2013）、short_name は <アプリ名>
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf-8"))
  const { name, shortName } = resolveManifestNames(manifest, root)
  const [appName, tagline, ...rest] = name.split(" – ")
  assert(appName && tagline && rest.length === 0, `manifest.name が "<アプリ名> – <タグライン>" ではありません: ${name}`)
  assert(shortName === appName, `manifest.short_name がアプリ名と一致しません: ${shortName}`)

  // ヘッダーは popup と options で同一の固定英語テキスト
  for(const file of FILES.slice(1)){
    const text = fs.readFileSync(path.join(root, file), "utf-8")
    assert(text.includes(`<div class="header-title">${appName}</div>`), `${file} の .header-title がアプリ名と一致しません`)
    assert(text.includes(`<div class="header-desc">${tagline}</div>`), `${file} の .header-desc がタグラインと一致しません`)
  }
}

const isTemplateRepo = fs.existsSync(path.join(ROOT, "README_TEMPLATE.md")) ||
  fs.existsSync(path.join(ROOT, "README_TEMPLATE-jp.md"))

if(isTemplateRepo){
  console.log("placeholder tests skipped (template repository)")
} else {
  checkProject(ROOT)
  console.log("placeholder tests passed")
}

// __MSG_xxx__ 形式でも、各ロケールの値が固定英語ヘッダーと一致することを確認する
const localizedRoot = fs.mkdtempSync(path.join(os.tmpdir(), "localized-placeholders-"))
try{
  fs.writeFileSync(path.join(localizedRoot, "manifest.json"), JSON.stringify({
    name: "__MSG_appName__",
    short_name: "__MSG_appShortName__",
    default_locale: "en",
  }))
  for(const file of FILES.slice(1)){
    fs.mkdirSync(path.dirname(path.join(localizedRoot, file)), { recursive: true })
    fs.writeFileSync(path.join(localizedRoot, file),
      '<div class="header-title">Example App</div><div class="header-desc">Quick Tools</div>')
  }
  for(const locale of ["en", "ja"]){
    const localeDir = path.join(localizedRoot, "_locales", locale)
    fs.mkdirSync(localeDir, { recursive: true })
    fs.writeFileSync(path.join(localeDir, "messages.json"), JSON.stringify({
      appName: { message: "Example App – Quick Tools" },
      appShortName: { message: "Example App" },
    }))
  }
  checkProject(localizedRoot)
} finally{
  fs.rmSync(localizedRoot, { recursive: true, force: true })
}
