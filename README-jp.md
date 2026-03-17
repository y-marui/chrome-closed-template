# Chrome Extension Template

> **これは日本語版（正本）です。**
> 英語版（参照）は [README.md](README.md) を参照してください。

Claude Code・GitHub Copilot など AI ツールを活用した開発に適した Chrome 拡張機能テンプレートです。

対象:
- Claude Code
- GitHub Copilot
- 小規模チーム（1〜3人）

## 拡張機能の読み込み

chrome://extensions → デベロッパーモード → パッケージ化されていない拡張機能を読み込む（プロジェクトルートを選択）

## 開発

```sh
npm test       # ユニットテスト実行
npm run build  # extension.zip を生成
```

### 初回セットアップ

```sh
pre-commit install  # git フックをインストール
```

### 最初に編集するファイル

| ファイル | 用途 |
|---------|------|
| `manifest.json` | 拡張機能名・バージョン・権限・content_scripts のマッチパターン |
| `src/content/content.js` | ウェブページに注入するロジック |
| `src/popup/popup.html` / `popup.js` | ポップアップ UI とアクション |
| `src/shared/message-types.js` | コンポーネント間通信のメッセージタイプを追加 |
| `public/icons/` | プレースホルダーアイコン（1×1px）を 16×16・48×48・128×128 の PNG に差し替える |

## リリース

1. `manifest.json` のバージョンを更新
2. `python3 build_extension_zip.py`（または `npm run build`）を実行
3. `extension.zip` を Chrome Web Store にアップロード

## ドキュメント

- [アーキテクチャ](docs/architecture.md)
- [AI ガイドライン](docs/ai-guidelines.md)
- [パーミッションポリシー](docs/permission-policy.md)
- [セキュリティチェックリスト](docs/security-checklist.md)
- [リリースプロセス](docs/release-process.md)
- [メンテナンスガイド](docs/maintenance-guide.md)
- [設計方針](docs/design-decisions.md)
- [開発憲章](docs/dev-charter/README.md)
