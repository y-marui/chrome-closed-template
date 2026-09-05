> このファイルは正本（日本語版）です。

# Security Checklist

Chrome Web Store 提出前およびコードレビュー時に確認するセキュリティ要件のチェックリスト。
実際のプロジェクトで使う場合は、`Minimize Permissions`・`Clarify host_permissions` の内容を
対象拡張機能の実際の権限に置き換えること。

## Minimize Permissions

- [ ] `permissions` に宣言されているすべての権限が実際に使用されているか
- [ ] 開発中にのみ使用した権限が本番の manifest に残っていないか
- [ ] 新しい権限を追加する場合、その必要性をコメントおよびこのチェックリストに明記したか

現在宣言している権限と用途（例）:

| 権限 | 用途 |
|------|------|
| `storage` | 設定の永続化 |

## Clarify host_permissions

- [ ] `host_permissions` の範囲が目的に対して必要最小限か
- [ ] `<all_urls>` ではなく、実際に対象とするドメイン（`https://*/*` 等）に限定しているか
- [ ] `web_accessible_resources` の `matches` も同様に限定しているか

現在の設定（例）:

```json
"host_permissions": []
```

## Prohibit Remote Code

- [ ] `eval()` / `new Function()` / `setTimeout(string)` / `setInterval(string)` を使用していないか
- [ ] 外部 URL から JavaScript を `<script src="...">` や `importScripts()` で読み込んでいないか
- [ ] CDN 等から CSS・JavaScript を動的に読み込んでいないか

外部スクリプトの読み込みは Chrome Web Store のポリシー違反となるため行わない。外部 API を
呼ぶ場合も、取得するのは JSON 等のデータのみとし、コードの実行は行わない。

## Prohibit Inline Scripts

- [ ] HTML ファイルに `<script>` インラインブロックが存在しないか
- [ ] `onclick="..."` 等のインラインイベントハンドラが存在しないか
- [ ] `javascript:` スキームの URL が存在しないか

## Enforce CSP (Content Security Policy)

`manifest.json` の CSP 設定（例）:

```json
"content_security_policy": {
  "extension_pages": "script-src 'self'; object-src 'none';"
}
```

- [ ] `script-src` に `'unsafe-inline'` / `'unsafe-eval'` が含まれていないか
- [ ] `object-src` が `'none'` になっているか
- [ ] CSP が `manifest.json` に明示的に定義されているか

## Remove Unnecessary Permissions Before Release

- [ ] 開発中にのみ使用した権限が本番の manifest に残っていないか（再掲・提出直前に再確認する）
- [ ] デバッグ用の権限（例: フィードバック系 API）は本番では削除を検討したか
- [ ] コメントアウトされた `permissions`/`host_permissions` エントリが存在しないか
- [ ] `manifest.json` の `version` がリリース対象のバージョンと一致しているか

## Data Handling

- [ ] ユーザーの入力内容・閲覧履歴をサーバーに送信していないか
- [ ] 外部 API へ通信する場合、送信する情報を必要最小限に絞っているか
- [ ] `chrome.storage.sync` に保存するデータがユーザー識別情報を含まないか
- [ ] コンソールログに個人情報が出力されていないか（本番ビルドでは削除する）

## content_script Scope

- [ ] content script は `document_start` ではなく `document_idle` で実行されているか（必要な場合を除く）
- [ ] ページから取得した文字列を DOM に挿入する際は `textContent` を使用し、`innerHTML` を避けているか。
      `innerHTML` が必要な場合は値をエスケープしているか
- [ ] content script から background への通信は `shared/messaging.js` 経由のみか

## Verification Flow

```text
コードレビュー時
  → このチェックリストのうち変更に関係する項目を確認する

リリース前（docs/release-process.md 参照）
  → このチェックリストを全項目確認する
  → Chrome 拡張機能の公式ポリシーを確認する
    https://developer.chrome.com/docs/webstore/program-policies/
```
