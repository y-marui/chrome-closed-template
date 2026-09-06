> このファイルは正本（日本語版）です。

# Release Process

バージョン更新から Chrome Web Store（および Firefox AMO）提出までの手順。

## 1. Update Version Numbers

`manifest.json` と `package.json` のバージョン番号を同じ値に更新する（セマンティックバージョニング）。

- **PATCH**: バグ修正
- **MINOR**: 後方互換のある機能追加
- **MAJOR**: 破壊的変更（ストレージ構造の変更等）

## 2. Update CHANGELOG

`CHANGELOG.md` に変更内容を追記する。バージョン番号・日付・追加/変更/修正/削除の区分・
ユーザーへの影響を記載する。

## 3. Run Tests

```bash
npm test
```

すべてのテストがパスすることを確認する。

## 4. Review Security Checklist

[docs/security-checklist.md](security-checklist.md) の全項目を確認する。

## 5. Build

```bash
npm run build:chrome
npm run build:firefox   # Firefox 非対応プロジェクトでは省略
```

`dist/{name}-{version}-{chrome,firefox}.zip` が生成される。

## 6. Manual dist/ Verification

- `chrome://extensions`（Firefox は `about:debugging#/runtime/this-firefox`）で `stage/<target>/`
  を読み込み、起動時にエラーが出ないこと
- `dist/*.zip` を展開し、`manifest.json` のバージョンが正しいこと
- アイコンファイルが `public/icons/` から正しく含まれていること
- 対応言語すべての `_locales/` が含まれていること（ローカライズ対応プロジェクトのみ）
- 主要機能が実際に動作すること（プロジェクト固有の確認項目をここに追記する）

## 7. Verify Zip Contents

ZIP に含まれるべきもの: `manifest.json`・`src/` のバンドル済みコード・`public/`（アイコン等）・`LICENSE`

ZIP に含まれてはいけないもの: バンドル前の `src/`・`test/`・`scripts/`・`docs/`・`node_modules/`・
`.github/`・`package.json`・`.gitignore`

## 8. Chrome Web Store Submission

1. [Chrome Web Store デベロッパーダッシュボード](https://chrome.google.com/webstore/devconsole/) にアクセスする
2. 対象の拡張機能を選択する
3. 「パッケージ」→ 新しいパッケージをアップロードで `dist/{name}-{version}-chrome.zip` をアップロードする
4. ストアの説明・スクリーンショット等に変更があれば `docs/store/` の内容を反映して更新する
5. 「審査のために送信」を選択する

審査には数日〜1 週間程度かかる場合がある。審査中に別バージョンを提出すると審査がリセットされる
場合がある。

## 9. Firefox AMO Submission

Firefox 非対応プロジェクトではこのステップを省略する。

1. [addons.mozilla.org のデベロッパーハブ](https://addons.mozilla.org/developers/) にアクセスする
2. `dist/{name}-{version}-firefox.zip` をアップロードする
3. 審査のために送信する

## 10. Git Tags

提出後、リポジトリにタグを打って push する。`v*` タグの push をトリガーに
`.github/workflows/release.yml` が Chrome/Firefox 両方の ZIP をビルドし、
チェックサムを添えて GitHub Release を自動作成する。

```bash
git tag v{version}
git push origin v{version}
# GitHub Actions が ZIP をビルドし GitHub Release を作成する
```

Actions が実行できない場合（課金・spending limit の問題等）は、同じ処理を
ローカルから実行できる。

```bash
make release
```

`workflow_dispatch` でも同じビルドをブランチ上で試せる（タグ push でない
ため GitHub Release の作成とバージョン一致チェックはスキップされる）。

## Notes

- `dist/`・`stage/` は `.gitignore` に含まれる。リポジトリにはコミットしない
- `npm run build`（引数無し）で Chrome・Firefox 両方を一度に生成できる
- Git タグの push で作成される GitHub Release は、Chrome Web Store / Firefox
  AMO への提出（ステップ 8・9）とは独立している。ストア提出の可否に関わらず
  タグを push すれば Release は作成される
