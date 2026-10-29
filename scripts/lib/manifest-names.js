/**
 * manifest.json の name / short_name の文字数検査
 *
 * __MSG_xxx__ は _locales/<locale>/messages.json（default_locale と全ロケール）で展開して検査する
 * （AMO は翻訳された名前も検査する）。上限の根拠は docs/popup-spec.md の Header 節を参照。
 */

import fs from 'node:fs';
import path from 'node:path';

export const NAME_ERROR_LIMIT = 50; // Firefox AMO（Chrome Web Store は 75）
export const NAME_WARN_LIMIT = 45; // Microsoft Edge Add-ons
export const SHORT_NAME_WARN_LIMIT = 12; // Chrome の推奨

const MSG_PATTERN = /^__MSG_(.+)__$/;

// 絵文字などのサロゲートペアを 1 文字として数える
const countChars = (text) => [...text].length;

function expand(value, root, label, errors) {
  const match = MSG_PATTERN.exec(value);
  if (!match) {
    return [{ where: label, text: value }];
  }

  const localesDir = path.join(root, '_locales');
  const locales = fs.existsSync(localesDir)
    ? fs.readdirSync(localesDir).filter((d) => fs.existsSync(path.join(localesDir, d, 'messages.json')))
    : [];
  if (locales.length === 0) {
    errors.push(`${label}: ${value} を展開できません（_locales が見つかりません）`);
    return [];
  }

  const key = match[1];
  const expanded = [];
  locales.forEach((locale) => {
    const messages = JSON.parse(fs.readFileSync(path.join(localesDir, locale, 'messages.json'), 'utf8'));
    const message = messages[key]?.message;
    if (typeof message === 'string') {
      expanded.push({ where: `${label} [${locale}]`, text: message });
    } else {
      errors.push(`${label} [${locale}]: メッセージキー ${key} がありません`);
    }
  });
  return expanded;
}

/** @returns {{errors: string[], warnings: string[], checked: string[]}} */
export function checkManifestNames(root = '.') {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
  const errors = [];
  const warnings = [];
  const checked = [];

  expand(manifest.name ?? '', root, 'name', errors).forEach(({ where, text }) => {
    const length = countChars(text);
    checked.push(`${where}: ${length} chars "${text}"`);
    if (length > NAME_ERROR_LIMIT) {
      errors.push(`${where}: ${length} chars exceeds ${NAME_ERROR_LIMIT} (Firefox AMO) "${text}"`);
    } else if (length > NAME_WARN_LIMIT) {
      warnings.push(`${where}: ${length} chars exceeds ${NAME_WARN_LIMIT} (Microsoft Edge Add-ons) "${text}"`);
    }
  });

  if (manifest.short_name) {
    expand(manifest.short_name, root, 'short_name', errors).forEach(({ where, text }) => {
      const length = countChars(text);
      checked.push(`${where}: ${length} chars "${text}"`);
      if (length > SHORT_NAME_WARN_LIMIT) {
        warnings.push(`${where}: ${length} chars exceeds ${SHORT_NAME_WARN_LIMIT} (Chrome recommendation) "${text}"`);
      }
    });
  }

  return { errors, warnings, checked };
}
