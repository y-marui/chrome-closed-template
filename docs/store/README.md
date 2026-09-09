# ストア掲載素材の管理ガイド

ストア掲載素材（テキスト・画像とも）はプラットフォームごとに `docs/store/<platform>/` に
まとめる。`assets/` はアイコンデザインの旧版アーカイブ専用とし、ストア提出物とは分離する
（`assets/README.md` があれば参照）。

## Directory Structure

```
docs/store/
├── chrome/
│   ├── en/                # Chrome Web Store 英語テキスト
│   ├── ja/                # Chrome Web Store 日本語テキスト
│   ├── screenshots/       # 1280x800 または 640x400
│   ├── permissions.md     # 権限使用理由（ロケール非依存）
│   ├── config.json        # カテゴリ・URL
│   └── README.md
├── firefox/
│   ├── en/                # Firefox AMO 英語テキスト
│   ├── ja/                # Firefox AMO 日本語テキスト
│   ├── screenshots/       # 最大 1280x800 推奨
│   ├── permissions.md     # （必要な場合のみ）
│   ├── config.json        # カテゴリ・URL
│   └── README.md
├── shared/
│   └── review_history.md  # 審査却下履歴
└── README.md               # このファイル
```

Firefox 非対応プロジェクトでは `docs/store/firefox/` を削除してよい。

**プライバシーポリシー:** リポジトリの公開状態に関わらずストアから参照できるよう、Gist等で
外部管理する。URLは各プラットフォームの `config.json` の `privacy_policy_url` を参照。

---

## Image Management

### How to Add
画像を更新する場合は、既存ファイルを削除せず新しいファイルを追加する。

```bash
# 推奨命名規則: YYYY-MM_説明.png
cp new_screenshot.png docs/store/chrome/screenshots/2025-06_main-popup.png
```

### Recommended Naming Convention
`YYYY-MM_説明.png` — 例: `2025-06_main-popup.png`、`2025-06_settings.png`

### Image Size Requirements

**Chrome Web Store**

| 種類 | サイズ | 場所 |
|------|--------|------|
| スクリーンショット | 1280x800 または 640x400 | `chrome/screenshots/` |

**Firefox AMO**

| 種類 | サイズ | 場所 |
|------|--------|------|
| スクリーンショット | 最大 1280x800 推奨 | `firefox/screenshots/` |

---

## Text Management

### When Updates Are Needed
- 機能追加・削除 → `description.md` 更新
- manifest.json の permissions 変更 → Chrome の `permissions.md` 更新必須

### Character Limits

- `description.md`: 16,000文字以内（Chrome Web Store の上限）

短い説明は `_locales/*/messages.json` の説明文から自動抽出できるプロジェクトでは、ここでは管理しない。

---

## Handling Review Rejection

1. `docs/store/shared/review_history.md` に却下理由と対応内容を記録
2. 該当ファイルを修正
3. コミットメッセージに修正内容を明記: `fix(store): address review feedback - [理由]`
4. 再申請

---

## Reference Links

- [Chrome Web Store デベロッパーダッシュボード](https://chrome.google.com/webstore/devconsole)
- [Chrome Web Store 審査ポリシー](https://developer.chrome.com/docs/webstore/program-policies/)
- [Firefox AMO デベロッパーハブ](https://addons.mozilla.org/developers/)
