> このファイルは正本（日本語版）です。

# File Map

_最終更新: 2026-05-01_

ファイルレベルの依存関係マップ。AI が作業のたびに追記していく運用。

## Background

| ファイル | 役割 | 主な依存先 |
|---|---|---|
| `src/background/service-worker.js` | Service Worker エントリーポイント | `src/background/bootstrap.js` |
| `src/background/bootstrap.js` | 初期化ロジック | `src/shared/messaging.js` |

## Content

| ファイル | 役割 | 主な依存先 |
|---|---|---|
| `src/content/content.js` | Content Script エントリーポイント | （依存なし） |

## Popup

| ファイル | 役割 | 主な依存先 |
|---|---|---|
| `src/popup/popup.html` | Popup エントリーポイント | `src/popup/popup.js` |
| `src/popup/popup.js` | Popup ロジック | （依存なし） |

## Shared

| ファイル | 役割 | 主な依存先 |
|---|---|---|
| `src/shared/messaging.js` | Chrome API ラッパー（メッセージ） | `src/shared/message-types.js` |
| `src/shared/storage.js` | Chrome API ラッパー（ストレージ） | （依存なし） |
| `src/shared/message-types.js` | メッセージタイプ定数 | （依存なし） |
| `src/shared/utils.js` | 純粋関数 | （依存なし） |

## 備考

- `src/shared/messaging.js` と `src/shared/storage.js` のみが Chrome API を呼び出す（[Chrome API ルール](../AI_CONTEXT.md#chrome-api-ルール)）
- `manifest.json` の `content_scripts.matches` が content.js の注入先を決める
