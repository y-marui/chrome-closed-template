> このファイルは正本（日本語版）です。

ファイルレベルの依存関係マップ。初回探索後に実際の依存関係を追記していく運用。

## エントリーポイント

| ファイル | 種別 | 役割 |
|---------|------|------|
| `src/background/service-worker.js` | Service Worker | Chrome が起動するエントリーポイント |
| `src/content/content.js` | Content Script | マッチページに注入されるエントリーポイント |
| `src/popup/popup.html` | Popup | ツールバーボタンクリック時のエントリーポイント |

## ファイル依存関係

```
src/background/service-worker.js
  └── src/background/bootstrap.js
        └── src/shared/messaging.js

src/content/content.js
  （依存なし）

src/popup/popup.html
  └── src/popup/popup.js
        （依存なし）

src/shared/messaging.js
  └── src/shared/message-types.js

src/shared/storage.js
  （依存なし）

src/shared/utils.js
  （依存なし）
```

## 備考

- `src/shared/messaging.js` と `src/shared/storage.js` のみが Chrome API を呼び出す（[Chrome API ルール](../AI_CONTEXT.md)）
- `manifest.json` の `content_scripts.matches` が content.js の注入先を決める
