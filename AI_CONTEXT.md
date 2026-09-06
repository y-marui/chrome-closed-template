# AI_CONTEXT.md

> **このファイルはセッションをまたぐ AI コンテキストの主ファイルです。**
> `docs/dev-charter/` の内容をこのプロジェクト向けにコンパイルしています。
> 日常作業では dev-charter を直接参照せず、このファイルを使用してください。

## AI Reference Order

タスク開始時に以下の順で参照する:

1. **README.md** — プロジェクト概要・セットアップ・コマンド・ドキュメント索引
2. **DEVELOPING.md** — ビルド・実装規約・命名規則

必要に応じて以下を参照する（順不同）:
- **CONTRIBUTING.md** — PR・Issue ルール
- **docs/architecture.md** — モジュール・コンポーネント構造・エントリーポイント
- **docs/file-map.md** — ファイルレベルの依存関係（情報が足りない・古い場合は適宜探索し、追記・更新する）
- **docs/specification.md** — 機能仕様・データフロー・パーミッションポリシー
- **docs/security-checklist.md** — リリース前・コードレビュー時のセキュリティ確認項目
- **docs/release-process.md** — バージョン更新から Chrome Web Store/Firefox AMO 提出までの手順
- **docs/ui-design.md** — UI 設計・コンポーネント仕様
- **docs/maintenance.md** — docs/ メンテナンス用プロンプト集

---

## Project Overview

- **名前:** Chrome Extension Template
- **種別:** クローズドプロジェクト
- **規模:** 1〜3人
- **目的:** AI-friendly Chrome 拡張機能テンプレート（Claude Code・GitHub Copilot 向け）
- **メンテナンス:** 将来的に外部委託の可能性あり

---

## Build & Test Commands

```sh
npm test                    # ユニットテスト
npm run lint                # ESLint (コード品質チェック)
npm run build:chrome        # Chrome Web Store 提出用 ZIP を dist/ に生成
npm run build:firefox       # Firefox AMO 提出用 ZIP を dist/ に生成
pre-commit run --all-files  # フック全実行
```

ツールチェーン（esbuild によるデュアルビルド・ESLint flat config・`node --test` 等）の
一般方針は
[docs/dev-charter/topics/chrome-extension/CHROME_EXTENSION_DEV_ENV.md](docs/dev-charter/topics/chrome-extension/CHROME_EXTENSION_DEV_ENV.md)
を参照。`npm run build`（引数無し）は `build:chrome`・`build:firefox` の両方を実行し、
`stage/chrome/`・`stage/firefox/` にそれぞれ展開する（同時に両方 Load Unpacked できる）。

**ローカルでの動作確認は Chrome・Firefox とも必ずビルドが必要。** プロジェクトルートを
直接 Load Unpacked することはできない。

---

## Architecture

```
src/
  background/   ライフサイクルロジック（service-worker.js → bootstrap.js）
  content/      ページ操作（ページに注入）
  popup/        UI（ツールバーポップアップ）
  shared/       再利用ロジック
    messaging.js  Chrome API ラッパー（メッセージ送受信）
    storage.js    Chrome API ラッパー（ローカルストレージ）
    utils.js      純粋関数（Chrome API 非依存）
```

---

## Chrome API Rules

`chrome.*` API を一点集約するアーキテクチャの一般方針は
[docs/dev-charter/topics/chrome-extension/CHROME_EXTENSION_DEV_ENV.md](docs/dev-charter/topics/chrome-extension/CHROME_EXTENSION_DEV_ENV.md)
の「Architecture (Centralized Chrome API Access)」を参照（`shared/storage.js`・
`shared/messaging.js` に集約し、popup・content からは直接呼ばない）。

- `permissions` / `host_permissions` の追加前は `docs/specification.md` のパーミッション・セキュリティチェックリスト を確認する

---

## Code Design Principles

- 変更範囲は必要最小限（over-engineering しない）
- YAGNI：今必要ない機能は実装しない
- DRY 違反の判断：2回の重複では抽象化しない、3回目で検討
- 既存コードの再利用：新規実装前に類似機能がないか確認
- 既存コードのパターンに従う（命名規則・アーキテクチャ・ディレクトリ構造）
- TODO/FIXME を残さない：実装するか issue として記録する
- 不要な依存追加禁止：既存の依存で解決できないか先に検討する
- 大きな変更前に方針を説明してから着手する
- コメントは「なぜそうするか」のみ書く。コードから自明な処理には書かない
- デバッグ用 `console.log` は本番コードに残さない

---

## Document Sync Rule

仕様・ルール・構成に変更が生じたとき、変更と同じ作業内で関連ドキュメントを更新する。
対象は `docs/` 内のファイルに限らず、`AI_CONTEXT.md`・`README.md` 等のルートファイルも含む。

---

## dev-charter Change Rules

`docs/dev-charter/` 配下のファイルを**直接編集しない**。

- 変更が必要な場合は dev-charter リポジトリ本体に Issue を立て、`git subtree pull` でアップデートを取り込む
- `git subtree pull` によるアップデートのみ許可する
- このプロジェクト固有のルールは `AI_CONTEXT.md` または専用ファイルに記載する

---

## AI Collaboration Rules

### AI Behavior Principles
- **Scope（スコープ厳守）**: 会話の主題・タスク・ゴールを AI が勝手に変更しない。話題変更はユーザーが明示するか、AI の提案をユーザーが許可した場合のみ
- **Uncertainty（不明点の扱い）**: 重要な情報不足は質問する。軽微な不足は合理的な仮定で補い、仮定を明示する。推測で断定しない

### Pre-Coding Confirmation
不明・未定の項目があれば**作業前に 1 回でまとめて**質問する。

**確認必須:** ゴール（完了条件）/ 言語・FW・バージョン制約 / 新規 or 既存コード修正 / テストの要否 / 影響範囲

**確認不要（既存コードに合わせて進める）:** コードスタイル / ファイル配置 / 軽微な実装詳細

### Error & Debug Handling
- エラー発生時は **原因分析 → 修正方針説明 → 実装** の順で進める
- エラーログ・スタックトレースは必ず全文確認してから対応
- 推測で修正しない（必要なら既存コードを確認）

### AI Tool Role Assignment

- **使用ツール**：Claude Code、GitHub Copilot、Gemini CLI
- **標準担当の正本**：`docs/dev-charter/AI_COLLABORATION_RULES.md` の「AI Tool Responsibilities」と「Rules for Multi-AI Usage」
- **プロジェクト固有の上書き**：なし

---

## Git Workflow

- Conventional Commits 形式（`feat` / `fix` / `refactor` / `docs` / `chore`）
- 動作しないコードはコミットしない（WIP 禁止）
- コミット粒度：機能単位・動作確認 OK 後

---

## Security Rules

- API キー・パスワード・トークンをコードに書かない
- `.env` ファイルはコミットしない（`.env.example` のみ可）
- シークレットを含むファイル・コード・スクリーンショットを AI に渡さない
- AI が生成したコードは必ずレビューしてからコミットする（SQLインジェクション・ハードコード認証情報等に注意）
- AI との会話ログをリポジトリにコミットしない
- 誤ってコミットしたシークレットは、履歴から削除した上で即座にローテーションする
- no remote code execution・inline scripts 禁止

### Code Review

- `main` に到達するコミットは `docs/dev-charter/AI_COLLABORATION_RULES.md` のレビュー経路に従って独立した確認を受ける（個人開発では実装担当と異なる AI によるレビューとオーナーの最終確認で代替できる）
- 認証・認可・暗号化・データアクセスに関わる変更はセキュリティレビューを必須とする

---

## UI Guidelines

詳細は [docs/ui-design.md](docs/ui-design.md) を参照。

- ライト・ダーク・システムの各モードに対応する
- システムカラーを優先。ネイティブ UI コンポーネントを優先
- Unicode 絵文字禁止（UI パーツ）
- アイコン: Google Material Symbols（第一選択）/ Font Awesome Brands / Lucide Icons / SVG

---

## Language Policy

- クローズドプロジェクト → **日本語が正本**
- `README.md` は英語（国際参照用）、`README-jp.md` が日本語正本
- ドキュメントの冒頭（タイトルを除く）に正本・参照の宣言を記載する
- ドキュメントを編集する際は日本語版を主として編集し、英語版をそれに合わせて更新する（英語版を独立して編集しない）

### Language in Code

| 対象 | ルール |
|------|--------|
| 識別子（変数名・関数名・クラス名） | 英語のみ |
| コードコメント | 日本語（主言語）に統一 |
| コミットメッセージ | 英語（Conventional Commits 形式） |
| Issue / PR タイトル | 日本語可 |

---

## Localization

サポート言語: システム設定 / 日本語 / 英語 / 中国語 / ヒンディー語 / スペイン語 / フランス語 / ポルトガル語

言語決定優先順位: ユーザー設定 → システム言語 → 英語

---

## Monetization

Chrome 拡張 → **Buy Me a Coffee** を使用する。独自課金システムは禁止。

**標準文言:**
> 役に立ったらサポートしてもらえると嬉しいです ☕
> （`☕` は非ユニコード絵文字 / Material Symbols に差し替えること）

**標準ボタン（サイズ変更禁止）:**
```html
<a href="https://www.buymeacoffee.com/y.marui" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
       alt="Buy Me A Coffee"
       style="height: 60px !important;width: 217px !important;">
</a>
```

**本格的なマネタイズを検討する場合:**
1. リポジトリに `MONETIZATION.md` を作成（対象プラットフォーム・収益モデル・価格設定・実施時期を記載）
2. この `AI_CONTEXT.md` のマネタイズセクションに概要を追記し、詳細は `MONETIZATION.md` を参照する旨を記載

---

## Design Decisions

- 機能モジュールは意図的に省略してテンプレートをシンプルに保つ
- テレメトリー・フィーチャーフラグは複雑さを避けるため非搭載

---

## Initial Setup (Right After Creating from the Template)

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
4. **Firefox 提出用 ID を設定する**（Firefox AMO への提出予定がある場合）:
   - `scripts/build.js` の `{extension-id}@example.com` を実際の一意な ID（例: `my-extension@example.com`）に置換する

---

## Reference Docs

憲章参照: `docs/dev-charter/CHARTER_INDEX.md` でトピックを特定してから該当ファイルのみ読む

- [アーキテクチャ・編集ガイド](docs/architecture.md)
- [ファイルマップ](docs/file-map.md)
- [機能仕様・パーミッション](docs/specification.md)
- [セキュリティチェックリスト](docs/security-checklist.md)
- [リリースプロセス](docs/release-process.md)
- [UI デザイン](docs/ui-design.md)
- [プライバシーポリシー](README-jp.md#privacy-policy)
- [docs/ メンテナンス](docs/maintenance.md)
- [Chrome Extension dev-env 一般方針](docs/dev-charter/topics/chrome-extension/CHROME_EXTENSION_DEV_ENV.md)
- [開発憲章](docs/dev-charter/README.md)
