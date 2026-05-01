> このファイルは正本（日本語版）です。

# Maintenance

`docs/` ファイルのメンテナンス用プロンプト集（ローカル LLM・AI ツール向け）。

---

## architecture.md を更新する

```
docs/architecture.md を最新の状態に更新してください。

手順：
1. プロジェクトのディレクトリ構造を確認する（src/ 配下のファイル一覧）
2. manifest.json を読んでエントリーポイントを確認する
3. src/shared/ 配下の主要モジュールの役割と依存関係を確認する
4. 既存の docs/architecture.md を読む
5. 以下のフォーマットで docs/architecture.md を上書き保存する：

---
> このファイルは正本（日本語版）です。

# Architecture

## Overview
（プロジェクト全体像を3行以内で記述）

## Entry Points
- `パス/ファイル` — 説明

## Directory Structure
| ディレクトリ | 役割 |
|---|---|
| `src/...` | ... |

## Key Dependencies
| モジュール | 用途 |
|---|---|
| `src/...` | ... |
---

注意：ファイルレベルの詳細は記載しない（file-map.md に委譲）。主要な依存のみ列挙し全依存を網羅しない。
```

---

## file-map.md を更新する

```
docs/file-map.md を最新の状態に更新してください。

手順：
1. src/ 配下のファイル一覧を確認する
2. 各ファイルの先頭数行を読んで役割と import / require を確認する
3. 既存の docs/file-map.md を読む
4. 以下のフォーマットで docs/file-map.md を上書き保存する：

---
> このファイルは正本（日本語版）です。

# File Map

_最終更新: YYYY-MM-DD_

## [モジュール / 機能名]
| ファイル | 役割 | 主な依存先 |
|---|---|---|
| `src/foo.js` | 説明 | `src/bar.js` |
---

注意：全ファイルを網羅しなくてよい。未探索ファイルは記載しない（不正確な記述を避ける）。更新のたびに「最終更新」日付を更新する。
```
