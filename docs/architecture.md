> このファイルは正本（日本語版）です。

## エントリーポイント

| ファイル | 種別 | Chrome による起動タイミング |
|---------|------|--------------------------|
| `src/background/service-worker.js` | Service Worker | 拡張機能読み込み時・イベント発生時 |
| `src/content/content.js` | Content Script | `manifest.json` の matches にマッチするページ読み込み時 |
| `src/popup/popup.html` | Popup | ツールバーボタンクリック時 |

## コンポーネント構成

- **background** → ライフサイクルロジック（onInstalled・サービスワーカー設定）
- **content** → ページ操作（ページに注入）
- **popup** → UI（ツールバーポップアップ）
- **shared** → 再利用ロジック。`messaging.js` と `storage.js` は Chrome API ラッパー。`utils.js` は純粋関数

## コンポーネント間依存関係

```
background ──→ shared/messaging.js
popup      ──→ shared/messaging.js（予定）
           ──→ shared/storage.js（予定）
content    ──→ shared/messaging.js（予定）
shared/messaging.js ──→ shared/message-types.js
```

ファイルレベルの詳細は [file-map.md](file-map.md) を参照。

## 編集ガイド

**自由に編集できるファイル:**

- `src/popup/` — UI の変更は他コンポーネントに副作用なし
- `src/content/` — ページ操作ロジック
- `src/shared/utils.js` — Chrome API 非依存の純粋関数

**慎重に編集すべきファイル:**

- `src/background/` — ここでのエラーは拡張機能全体をサイレントに壊す
- `manifest.json` の permissions — 追加前にセキュリティレビュー必須（[パーミッションポリシー](permission-policy.md) を参照）
