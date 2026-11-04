---
description: テンプレートから新規プロジェクトを作成した直後に行う初期設定の手順（設定適用・README・プレースホルダ・ストア素材）
---

> このファイルは正本（日本語版）です。

# Initial Setup

テンプレートから新規プロジェクトを作成した直後に以下の手順を実行する:

1. **GitHub リポジトリ設定を適用する**（テンプレートからの作成時はすべての設定が初期化されるため最優先）
2. **README をリネームする**:
   - `README_TEMPLATE.md` → `README.md`（旧 `README.md` を削除）
   - `README_TEMPLATE-jp.md` → `README-jp.md`（旧 `README-jp.md` を削除）
3. **プレースホルダを置換する**（`README.md`・`README-jp.md`・`LICENSE`）:
   - `{user}` / `{repo}` / `{workflow}` — このプロジェクトのリポジトリ情報
   - `[YEAR]` / `[AUTHOR]` — 現在の年と著作権者名
   - `[USERNAME]` — GitHub ユーザー名（GitHub Sponsors バッジ・`.github/FUNDING.yml`）
   - `[BMC_USERNAME]` — Buy Me a Coffee ユーザー名（`.github/FUNDING.yml`・サポートバッジ）
   - `[APP_NAME]` / `[TAGLINE]` — アプリ名とタグライン（英語固定。いずれも `manifest.json`・`src/popup/popup.html`・`src/options/options.html` に含まれる）。
     `name` は `<アプリ名> – <タグライン>`（en dash U+2013 の前後に半角スペース）、`short_name` は `<アプリ名>`、
     popup と options サイドバーの `.header-title` / `.header-desc` はそれぞれアプリ名 / タグライン。
     規約の詳細は [docs/popup-spec.md](docs/popup-spec.md) の Header 節。置換漏れは `npm test`（`test/unit/placeholders.test.js`）が検出する。
     置換後は `name` の文字数（50 文字以内、Edge にも出すなら 45 文字以内）と `short_name`（12 文字以内）を `npm run validate:store` で確認する
4. **Firefox 提出用 ID を設定する**（Firefox AMO への提出予定がある場合）:
   - `scripts/build.js` の `{extension-id}@example.com` を実際の一意な ID（例: `my-extension@example.com`）に置換する
5. **ストア掲載素材のプレースホルダを置換する**（`docs/store/`）:
   - Firefox 非対応の場合は `docs/store/firefox/` ごと削除する
   - `src/popup/popup.html`・`src/options/options.html` とストアconfigの `https://url.invalid/to/hp`・`https://url.invalid/to/privacy`・`https://url.invalid/to/terms`・`https://url.invalid/to/support` を、プロジェクトの実際の公開URLに置換する。これらは意図的に無効なプレースホルダーで、テンプレートのリポジトリや非公開リポジトリへのリンクで代用しない
   - 公開ページの到達性を確認してから提出する。個人ドメイン・公開先リポジトリはテンプレートに固定せず、プロジェクト設定で管理する
   - `chrome/ja・en/description.md`・`chrome/permissions.md` を実際の内容に書き換える
