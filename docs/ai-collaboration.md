---
description: AI の振る舞い・コーディング前の確認事項・エラー対応・AI ツールの役割分担
---

> このファイルは正本（日本語版）です。

# AI Collaboration Rules

## AI Behavior Principles
- **Scope（スコープ厳守）**: 会話の主題・タスク・ゴールを AI が勝手に変更しない。話題変更はユーザーが明示するか、AI の提案をユーザーが許可した場合のみ
- **Uncertainty（不明点の扱い）**: 重要な情報不足は質問する。軽微な不足は合理的な仮定で補い、仮定を明示する。推測で断定しない

## Pre-Coding Confirmation
不明・未定の項目があれば**作業前に 1 回でまとめて**質問する。

**確認必須:** ゴール（完了条件）/ 言語・FW・バージョン制約 / 新規 or 既存コード修正 / テストの要否 / 影響範囲

**確認不要（既存コードに合わせて進める）:** コードスタイル / ファイル配置 / 軽微な実装詳細

## Error & Debug Handling
- エラー発生時は **原因分析 → 修正方針説明 → 実装** の順で進める
- エラーログ・スタックトレースは必ず全文確認してから対応
- 推測で修正しない（必要なら既存コードを確認）

## AI Tool Role Assignment

- **使用ツール**：Claude Code、GitHub Copilot、Gemini CLI
- **標準担当の正本**：`docs/dev-charter/AI_COLLABORATION_RULES.md` の「AI Tool Responsibilities」と「Rules for Multi-AI Usage」
- **プロジェクト固有の上書き**：なし
