import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

// アプリ名・タグラインのプレースホルダが、テンプレートから作った拡張に残っていないことを検証する。
// README_TEMPLATE.md を持つリポジトリはテンプレート自身なので、意図的に残してあるものとして対象外にする
// （scripts/check-readme-placeholders.sh と同じ設計）。
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const PLACEHOLDERS = ["[APP_NAME]", "[TAGLINE]"]
const FILES = ["manifest.json", "src/popup/popup.html", "src/options/options.html"]

function assert(cond, msg){
  if(!cond){
    throw new Error(msg)
  }
}

const isTemplateRepo = fs.existsSync(path.join(ROOT, "README_TEMPLATE.md")) ||
  fs.existsSync(path.join(ROOT, "README_TEMPLATE-jp.md"))

if(isTemplateRepo){
  console.log("placeholder tests skipped (template repository)")
} else {
  for(const file of FILES){
    const text = fs.readFileSync(path.join(ROOT, file), "utf-8")
    for(const placeholder of PLACEHOLDERS){
      assert(!text.includes(placeholder), `${file} にプレースホルダ ${placeholder} が残っています`)
    }
  }

  // 規約: name は "<アプリ名> – <タグライン>"（en dash U+2013）、short_name は <アプリ名>
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "manifest.json"), "utf-8"))
  const [appName, tagline, ...rest] = manifest.name.split(" – ")
  assert(appName && tagline && rest.length === 0, `manifest.name が "<アプリ名> – <タグライン>" ではありません: ${manifest.name}`)
  assert(manifest.short_name === appName, `manifest.short_name がアプリ名と一致しません: ${manifest.short_name}`)

  // ヘッダーは popup と options で同一の固定英語テキスト
  for(const file of FILES.slice(1)){
    const text = fs.readFileSync(path.join(ROOT, file), "utf-8")
    assert(text.includes(`<div class="header-title">${appName}</div>`), `${file} の .header-title がアプリ名と一致しません`)
    assert(text.includes(`<div class="header-desc">${tagline}</div>`), `${file} の .header-desc がタグラインと一致しません`)
  }
  console.log("placeholder tests passed")
}
