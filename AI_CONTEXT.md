---
description: セッションをまたぐ AI コンテキストの主ファイル（プロジェクト概要・コマンド・規約・参照順）
---

# AI_CONTEXT.md

> **このファイルはセッションをまたぐ AI コンテキストの主ファイルです。**
> `docs/dev-charter/` の内容をこのプロジェクト向けにコンパイルしています。
> 日常作業ではこのファイルを使用してください。憲章の参照が必要な作業は「Charter Lookup」に従ってください。

## Charter Lookup

憲章参照: `docs/dev-charter/CHARTER_INDEX.md` でトピックを特定してから該当ファイルのみ読む

次の変更を始める前に、該当トピックを確認する: UI・ローカライズ・CI/ワークフロー・リリース・依存関係・ライセンス・PR/ブランチ運用。

1. `docs/dev-charter/CHARTER_INDEX.md` を読み、該当トピックのファイルを特定する
2. 特定したファイル（原則 1〜2 件）のみを読む
3. 参照後にユーザーへ提案・確認を行う

## AI Reference Order

タスク開始時に以下の順で参照する:

1. **README.md** — プロジェクト概要・セットアップ・コマンド・ドキュメント索引
2. **DEVELOPING.md** — ビルド・実装規約・命名規則

必要に応じて、末尾の「Reference Docs」の文書を参照する（順不同）。
`docs/file-map.md` は情報が足りない・古い場合に、適宜探索して追記・更新する。

## Project Overview

- **名前:** Chrome Extension Template
- **種別:** クローズドプロジェクト
- **規模:** 1〜3人
- **目的:** AI-friendly Chrome 拡張機能テンプレート（Claude Code・GitHub Copilot 向け）
- **メンテナンス:** 将来的に外部委託の可能性あり

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
docs/store/     ストア掲載素材（説明文・権限使用理由・スクリーンショット。詳細は docs/store/README.md）
assets/         アイコン原本・旧版とストア画像の撮影元・候補・旧掲載画像（assets/README.md参照）
```

## Chrome API Rules

`chrome.*` API を一点集約するアーキテクチャの一般方針は
[docs/dev-charter/topics/chrome-extension/CHROME_EXTENSION_DEV_ENV.md](docs/dev-charter/topics/chrome-extension/CHROME_EXTENSION_DEV_ENV.md)
の「Architecture (Centralized Chrome API Access)」を参照（`shared/storage.js`・
`shared/messaging.js` に集約し、popup・content からは直接呼ばない）。

- `permissions` / `host_permissions` の追加前は `docs/specification.md` のパーミッション・セキュリティチェックリスト を確認する

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

## Document Sync Rule

仕様・ルール・構成に変更が生じたとき、変更と同じ作業内で関連ドキュメントを更新する。
対象は `docs/` 内のファイルに限らず、`AI_CONTEXT.md`・`README.md` 等のルートファイルも含む。

## dev-charter Change Rules

`docs/dev-charter/` 配下のファイルを**直接編集しない**。

- 変更が必要な場合は dev-charter リポジトリ本体に Issue を立て、`git subtree pull` でアップデートを取り込む
- `git subtree pull` によるアップデートのみ許可する
- このプロジェクト固有のルールは `AI_CONTEXT.md` または専用ファイルに記載する

## Chrome Web Store URLs

Chrome Web Store のURLは製品名部分を含めず、`https://chromewebstore.google.com/detail/<拡張機能ID>` に統一する。サポートURLはその末尾に `/support` を付ける。README・ストア設定・公開製品ページに同じ規則を適用する。

## AI Collaboration Rules

スコープ厳守（主題を勝手に変えない）、不明点は作業前に 1 回でまとめて質問、エラーは原因分析 → 方針説明 → 実装の順。
詳細とツール担当は [docs/ai-collaboration.md](docs/ai-collaboration.md) を参照する。

## Git Workflow

- Conventional Commits 形式（`feat` / `fix` / `refactor` / `docs` / `chore`）
- 動作しないコードはコミットしない（WIP 禁止）
- コミット粒度：機能単位・動作確認 OK 後

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

## UI Guidelines

詳細は [docs/ui-design.md](docs/ui-design.md) を参照。

- ライト・ダーク・システムの各モードに対応する
- システムカラーを優先。ネイティブ UI コンポーネントを優先
- Unicode 絵文字禁止（UI パーツ）
- アイコン: Google Material Symbols（第一選択）/ Font Awesome Brands / Lucide Icons / SVG

## Language Policy / Localization

クローズドプロジェクトは日本語が正本（`README.md` のみ英語）。識別子は英語、コメントは日本語、コミットメッセージは英語。
対応言語と決定優先順位は [docs/language-policy.md](docs/language-policy.md) を参照する。

## Monetization

Chrome 拡張は **Buy Me a Coffee** を使用し、独自課金システムは禁止。標準文言・標準ボタン（サイズ変更禁止）と
本格的なマネタイズの手順は [docs/monetization.md](docs/monetization.md) を参照する。

## Design Decisions

- 機能モジュールは意図的に省略してテンプレートをシンプルに保つ
- テレメトリー・フィーチャーフラグは複雑さを避けるため非搭載

## Initial Setup

テンプレートから新規プロジェクトを作成した直後は、[docs/initial-setup.md](docs/initial-setup.md) の手順を実行する
（GitHub 設定の適用 → README のリネーム → プレースホルダ置換 → Firefox ID → ストア素材）。

## Reference Docs

- [アーキテクチャ・編集ガイド](docs/architecture.md)
- [ファイルマップ](docs/file-map.md)
- [機能仕様・パーミッション](docs/specification.md)
- [セキュリティチェックリスト](docs/security-checklist.md)
- [リリースプロセス](docs/release-process.md)
- [初期設定](docs/initial-setup.md)
- [AI 協働ルール](docs/ai-collaboration.md)
- [言語ポリシー・ローカライズ](docs/language-policy.md)
- [マネタイズ](docs/monetization.md)
- [ストア掲載素材](docs/store/README.md)
- [UI デザイン](docs/ui-design.md)
- [プライバシーポリシー](README-jp.md#privacy-policy)
- [docs/ メンテナンス](docs/maintenance.md)
- [Chrome Extension dev-env 一般方針](docs/dev-charter/topics/chrome-extension/CHROME_EXTENSION_DEV_ENV.md)
- [開発憲章](docs/dev-charter/README.md)
