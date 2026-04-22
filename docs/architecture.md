> このファイルは正本（日本語版）です。

## コンポーネント構成

- **background** → ライフサイクルロジック（onInstalled・サービスワーカー設定）
- **content** → ページ操作（ページに注入）
- **popup** → UI（ツールバーポップアップ）
- **shared** → 再利用ロジック。`messaging.js` と `storage.js` は Chrome API ラッパー。`utils.js` は純粋関数

## 編集ガイド

**自由に編集できるファイル:**

- `src/popup/` — UI の変更は他コンポーネントに副作用なし
- `src/content/` — ページ操作ロジック
- `src/shared/utils.js` — Chrome API 非依存の純粋関数

**慎重に編集すべきファイル:**

- `src/background/` — ここでのエラーは拡張機能全体をサイレントに壊す
- `manifest.json` の permissions — 追加前にセキュリティレビュー必須（[パーミッションポリシー](permission-policy.md) を参照）
