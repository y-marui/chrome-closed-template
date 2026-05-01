> このファイルは正本（日本語版）です。

Chrome 拡張機能テンプレートの機能仕様・動作定義・データフロー。
このリポジトリ自体はテンプレートのため、以下はテンプレートが提供するデフォルト動作を定義します。
実際のプロジェクトでは、このファイルを対象アプリの仕様に書き換えてください。

## 機能仕様（テンプレートデフォルト）

| 機能 | 動作 |
|------|------|
| 拡張機能インストール | `onInstalled` イベントでコンソールログを出力 |
| ポップアップ表示 | 「Action」ボタンを含む最小 UI を表示 |
| ポップアップボタン押下 | コンソールログを出力（実際の処理はここに追加） |
| コンテンツスクリプト注入 | `https://*/*` にマッチする全ページにスクリプトを注入し、コンソールログを出力 |
| メッセージ通信 | `messaging.js` 経由で popup/content ↔ background 間でメッセージを送受信 |

## データフロー

```
[ユーザー操作]
     │
     ▼
[popup.js]
     │ chrome.runtime.sendMessage (shared/messaging.js 経由)
     ▼
[background/service-worker.js]
     │ 応答: sendResponse
     ▼
[popup.js] → UI 更新

[ページ読み込み]
     │
     ▼
[content.js] ← manifest.json の content_scripts で自動注入
```

## ストレージ仕様

`shared/storage.js` 経由で Chrome Local Storage を使用する。

| キー | 型 | 用途 | デフォルト |
|------|----|------|-----------|
| （テンプレートではストレージ未使用） | — | — | — |

## メッセージ仕様

`shared/message-types.js` にメッセージタイプを定義する。

| メッセージタイプ | 送信元 | 送信先 | ペイロード |
|----------------|--------|--------|-----------|
| `EXAMPLE_ACTION` | popup | background | `{}` |

## パーミッション

`manifest.json` 参照。テンプレートデフォルトでは permissions・host_permissions ともに空（最小権限）。

最小権限の原則を徹底する:

- `<all_urls>` は必要な場合を除き使用しない。テンプレートでは `"https://*/*"` を起点として、実際に対象とするドメインに絞り込む
- `permissions` / `host_permissions` はできる限り空に保ち、機能に必要なものだけを追加する
- 新しいパーミッションを追加する前に [Chrome permission warnings](https://developer.chrome.com/docs/extensions/reference/permissions-list) を確認する

## セキュリティチェックリスト

- パーミッション最小化: 必要なものだけ要求する
- `host_permissions` 最小化: `<all_urls>` のような広域パターンを避ける
- リモートコード実行禁止: 外部スクリプトをフェッチして実行しない
- インラインスクリプト禁止: HTML 内に `<script>` ブロックや `onclick` 属性を書かない
