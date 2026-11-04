---
description: Buy Me a Coffee の標準文言・標準ボタンと、本格的なマネタイズを検討する場合の手順
---

> このファイルは正本（日本語版）です。

# Monetization

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
2. `AI_CONTEXT.md` の Monetization セクションに概要を追記し、詳細は `MONETIZATION.md` を参照する旨を記載
