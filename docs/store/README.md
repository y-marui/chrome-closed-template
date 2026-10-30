# ストア掲載素材の管理ガイド

> このファイルは正本（日本語版）です。

ストア掲載素材（テキスト・採用済み画像）は `docs/store/<platform>/` にまとめる。
撮影元・候補・旧掲載画像は `assets/store/<platform>/` で管理する。
画像の採用・差し替え・保管規約の正本は [assets/README.md](../../assets/README.md#store-image-workflow)。

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

**公開URL:** 製品ホーム・プライバシーポリシー・利用規約・サポートは、ストアから参照可能な公開ページを各プロジェクトで用意する。公開先を特定のホストやGistに固定しない。設定とUI内の `https://url.invalid/to/hp`・`https://url.invalid/to/privacy`・`https://url.invalid/to/terms`・`https://url.invalid/to/support` は意図的に無効なプレースホルダーで、公開先への置換と到達性確認が必要。非公開リポジトリのURLを公開窓口の代用にしない。

---

## Image Management

### How to Add

[画像管理規約](../../assets/README.md#store-image-workflow)に従い、採用済みの画像だけを置く。
差し替えた旧掲載画像は `assets/store/<platform>/archive/` に移す。
現在の掲載順と使用ファイルは各プラットフォームのREADMEに明記する。

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
