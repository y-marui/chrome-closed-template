# {プロジェクト名}

> **このファイルは正本（日本語版）です。**
> 英語版（参照）は [README.md](README.md) を参照してください。

[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](LICENSE)
[![CI](https://github.com/{user}/{repo}/actions/workflows/{workflow}.yml/badge.svg)](https://github.com/{user}/{repo}/actions/workflows/{workflow}.yml)
[![Charter Check](https://github.com/{user}/{repo}/actions/workflows/dev-charter-check.yml/badge.svg)](https://github.com/{user}/{repo}/actions/workflows/dev-charter-check.yml)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/[USERNAME]?style=social)](https://github.com/sponsors/[USERNAME])
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-donate-yellow.svg)](https://www.buymeacoffee.com/[BMC_USERNAME])

{一行概要：何を・誰のために・どう解決するかを 1 文で}

## Setup

Node.js v20 以上と [pre-commit](https://pre-commit.com) が必要です。

```sh
npm install
pre-commit install          # git フックをインストール
pre-commit run --all-files  # 動作確認
npm test                    # ユニットテスト確認
```

拡張機能を読み込む(先にビルドが必要。`npm run build` で Chrome・Firefox 両方生成される):

1. `npm run build` を実行する
2. Chrome で `chrome://extensions` を開き、デベロッパーモードを有効にする
3. 「パッケージ化されていない拡張機能を読み込む」で `stage/chrome/` を選択

## Usage

```sh
npm test                    # ユニットテスト実行
npm run build                # Chrome・Firefox 両方の ZIP を dist/ に生成
npm run build:chrome         # Chrome Web Store 提出用 ZIP を dist/ に生成
npm run build:firefox        # Firefox AMO 提出用 ZIP を dist/ に生成
pre-commit run --all-files  # セキュリティ・品質フック全実行
```

## License

Copyright (c) [YEAR] [AUTHOR]. All Rights Reserved — 詳細は [LICENSE](LICENSE) を参照してください。

## プライバシーポリシー

- URL: {privacy_policy_url}
