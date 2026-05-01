> このファイルは正本（日本語版）です。

# Architecture

## Overview

Chrome 拡張機能テンプレート。background / content / popup / shared の最小構成で、AI フレンドリーな開発をサポートする。Chrome API 呼び出しは `shared/` に集約し、他モジュールはそれを利用する。

## Entry Points

- `src/background/service-worker.js` — Service Worker（Chrome 起動時・イベント発生時）
- `src/content/content.js` — Content Script（`manifest.json` の matches にマッチするページ）
- `src/popup/popup.html` — Popup（ツールバーボタンクリック時）

## Directory Structure

| ディレクトリ | 役割 |
|---|---|
| `src/background/` | ライフサイクルロジック（service-worker.js → bootstrap.js） |
| `src/content/` | ページ操作（ページに注入） |
| `src/popup/` | UI（ツールバーポップアップ） |
| `src/shared/` | 再利用ロジック（Chrome API ラッパー・純粋関数） |
| `public/` | 静的アセット（アイコン等） |

## Key Dependencies

| モジュール | 用途 |
|---|---|
| `src/shared/messaging.js` | Chrome API ラッパー（メッセージ送受信） |
| `src/shared/storage.js` | Chrome API ラッパー（ローカルストレージ） |
| `src/shared/message-types.js` | メッセージタイプ定数 |
| `src/shared/utils.js` | 純粋関数（Chrome API 非依存） |

ファイルレベルの詳細は [file-map.md](file-map.md) を参照。

## 編集ガイド

**自由に編集できるファイル:**

- `src/popup/` — UI の変更は他コンポーネントに副作用なし
- `src/content/` — ページ操作ロジック
- `src/shared/utils.js` — Chrome API 非依存の純粋関数

**慎重に編集すべきファイル:**

- `src/background/` — ここでのエラーは拡張機能全体をサイレントに壊す
- `manifest.json` の permissions — 追加前にセキュリティレビュー必須（[specification.md のパーミッション](specification.md#パーミッション) を参照）
