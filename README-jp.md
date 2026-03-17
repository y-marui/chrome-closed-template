# Chrome Extension Template

> **このファイルは正本（日本語版）です。**
> 英語版（参照）は [README.md](README.md) を参照してください。

[![CI](https://github.com/y-marui/chrome-extension-template/actions/workflows/ci.yml/badge.svg)](https://github.com/y-marui/chrome-extension-template/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)](LICENSE)

Chrome 拡張機能を AI 支援開発（Claude Code・GitHub Copilot）で構築するためのテンプレート。小規模クローズドチーム（1〜3人）向け。

| 項目 | 内容 |
|------|------|
| 開発対象 | Chrome 拡張機能（Manifest V3） |
| 開発環境 | 小規模チーム（1〜3人） |
| 主言語 | 日本語 |
| AI ツール | Claude Code / GitHub Copilot / Gemini CLI |
| 動作環境 | Chrome（最新版） |

## 特徴

- ✅ Manifest V3 対応（サービスワーカーベース）
- ✅ 役割が明確な 3 層アーキテクチャ（background / content / popup）
- ✅ Chrome API 共有ラッパー（messaging.js / storage.js）
- ✅ ユニットテスト環境設定済み（Node.js テストランナー）
- ✅ pre-commit セキュリティフック（gitleaks・シークレット検出）
- ✅ `npm run build` で extension.zip を自動生成
- ✅ AI 向けコンテキストファイル（AI_CONTEXT.md / CLAUDE.md）付き

## クイックスタート

### 1. リポジトリを使用する

「Use this template」ボタンから新規リポジトリを作成し、クローンします。

```sh
git clone https://github.com/[your-username]/[your-repo].git
cd [your-repo]
```

### 2. 環境構築

Node.js v20 以上と [pre-commit](https://pre-commit.com) をインストールした上で実行します。

```sh
pre-commit install       # git フックをインストール
pre-commit run --all-files  # 動作確認
npm test                 # ユニットテスト確認
```

### 3. 拡張機能の読み込み

1. Chrome で `chrome://extensions` を開く
2. デベロッパーモードを有効にする
3. 「パッケージ化されていない拡張機能を読み込む」でプロジェクトルートを選択

## コマンド一覧

```sh
npm test                    # ユニットテスト実行
npm run build               # extension.zip を生成
pre-commit run --all-files  # セキュリティ・品質フック全実行
```

## プロジェクト構造

```
chrome-extension-template/
├── src/
│   ├── background/       ライフサイクルロジック（service-worker.js）
│   ├── content/          ウェブページに注入するロジック
│   ├── popup/            ツールバーポップアップ UI
│   └── shared/           Chrome API ラッパー・共通ユーティリティ
├── public/icons/         拡張機能アイコン（16 / 48 / 128px）
├── test/unit/            ユニットテスト
├── docs/                 ドキュメント
├── manifest.json         拡張機能マニフェスト（MV3）
└── AI_CONTEXT.md         AI ツール向けコンテキスト
```

## カスタマイズ手順

テンプレートから新規プロジェクトを始める際に編集するファイル:

| ファイル | 用途 |
|---------|------|
| `manifest.json` | 拡張機能名・バージョン・権限・content_scripts のマッチパターン |
| `src/content/content.js` | ウェブページに注入するロジック |
| `src/popup/popup.html` / `popup.js` | ポップアップ UI とアクション |
| `src/shared/message-types.js` | コンポーネント間通信のメッセージタイプ |
| `public/icons/` | プレースホルダー（1×1px）を 16×16・48×48・128×128px の PNG に差し替える |

## AI 支援開発

このテンプレートは Claude Code・GitHub Copilot を使った開発を前提としています。

| AI ツール | 役割 |
|---|---|
| Claude Code | 構成変更・大規模実装・アーキテクチャ設計 |
| GitHub Copilot | 細かな実装補助・テスト作成 |
| Gemini CLI | ドキュメント生成・翻訳補助 |

詳細は [AI_CONTEXT.md](AI_CONTEXT.md) を参照してください。

## ドキュメント索引

| ドキュメント | 内容 |
|---|---|
| [アーキテクチャ](docs/architecture.md) | コンポーネント構成と設計方針 |
| [AI ガイドライン](docs/ai-guidelines.md) | AI ツール利用ルール |
| [パーミッションポリシー](docs/permission-policy.md) | Chrome 権限の追加基準 |
| [セキュリティチェックリスト](docs/security-checklist.md) | リリース前確認事項 |
| [リリースプロセス](docs/release-process.md) | Chrome Web Store への公開手順 |
| [メンテナンスガイド](docs/maintenance-guide.md) | 継続的なメンテナンス方針 |
| [設計方針](docs/design-decisions.md) | 技術的な意思決定の記録 |
| [開発憲章](docs/dev-charter/README.md) | プロジェクト横断の開発ポリシー |

## リリース手順

1. `manifest.json` のバージョンを更新
2. `npm run build` を実行（`extension.zip` が生成される）
3. `extension.zip` を Chrome Web Store にアップロード

## ライセンス

Copyright (c) [YEAR] [AUTHOR]. All Rights Reserved — 詳細は [LICENSE](LICENSE) を参照してください。
