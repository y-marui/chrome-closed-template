#!/usr/bin/env node
/**
 * Chrome Web Store 掲載素材の検証スクリプト
 *
 * 検証項目:
 * - 詳細説明の文字数 (16,000文字以内)
 *
 * 使い方:
 *   npm run validate:store
 *
 * 短い説明は manifest.json の description から自動抽出されるため管理不要。
 * 画像サイズの検証は行わない。README のサイズ要件を参照のこと。
 */

import fs from 'node:fs';
import path from 'node:path';

const DESCRIPTION_LIMIT = 16000;
const LOCALES = ['en', 'ja'];
const PLATFORMS = ['chrome', 'firefox'];

let errors = [];

function validateTextFiles(platform) {
  LOCALES.forEach((locale) => {
    const localeDir = path.join('docs/store', platform, locale);
    if (!fs.existsSync(localeDir)) {
      console.log(`  [SKIP] Not found: ${localeDir}`);
      return;
    }

    const descPath = path.join(localeDir, 'description.md');
    if (fs.existsSync(descPath)) {
      const length = fs.readFileSync(descPath, 'utf8').length;
      if (length <= DESCRIPTION_LIMIT) {
        console.log(`  [OK] ${platform}/${locale}/description.md: ${length} chars (max ${DESCRIPTION_LIMIT})`);
      } else {
        errors.push(`  [ERROR] ${platform}/${locale}/description.md: ${length} chars exceeds limit (${DESCRIPTION_LIMIT})`);
      }
    }
  });
}

function main() {
  console.log('Store Assets Validation');
  console.log('='.repeat(40));

  PLATFORMS.forEach((platform) => {
    console.log(`\n[${platform === 'chrome' ? 'Chrome Web Store' : 'Firefox AMO'}]`);
    validateTextFiles(platform);
  });

  console.log('\n' + '='.repeat(40));
  if (errors.length > 0) {
    console.log('\nValidation failed:\n');
    errors.forEach((err) => console.log(err));
    process.exit(1);
  } else {
    console.log('\nAll validations passed.');
    process.exit(0);
  }
}

main();
