/**
 * scripts/build.js
 *
 * esbuild で全 JS エントリポイントをバンドルし、Chrome / Firefox 向けの
 * 提出用 ZIP を生成する。
 *
 * バンドル出力は元のソースファイルと同じ相対パスに配置する
 * （manifest.json のパス指定を書き換えずに済ませるため）。
 * バンドルされる JS の中身は Chrome/Firefox で共通で、差異は
 * manifest.json の background 指定のみ（stage/{chrome,firefox}/ に分けて
 * 出力するのは、同時に両方 Load Unpacked できるようにするため）。
 *
 * 使用方法:
 *   node scripts/build.js chrome
 *   node scripts/build.js firefox
 *
 * 出力先:
 *   stage/chrome/ , stage/firefox/  （展開済み、Load Unpacked 用。ターゲットごとに別ディレクトリ）
 *   dist/{name}-{version}-{chrome,firefox}.zip
 */

import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');

const target = process.argv[2];
if (!['chrome', 'firefox'].includes(target)) {
  console.error('Usage: node scripts/build.js <chrome|firefox>');
  process.exit(1);
}

const STAGE_DIR = path.join(ROOT, 'stage', target);

const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf-8'));
const pkg      = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
const version  = manifest.version;
const name     = pkg.name;

// ── エントリポイント一覧 ────────────────────────────────────────────
const ENTRY_POINTS = [
  'src/background/service-worker.js',
  'src/popup/popup.js',
  'src/content/content.js',
];

// ── コピーする静的ファイル/ディレクトリ ──────────────────────────────
const STATIC_INCLUDE = [
  'manifest.json',
  'public',
  'src/popup/popup.html',
  'src/popup/popup.css',
  'LICENSE',
];

fs.rmSync(STAGE_DIR, { recursive: true, force: true });
fs.mkdirSync(STAGE_DIR, { recursive: true });

for (const rel of STATIC_INCLUDE) {
  const src  = path.join(ROOT, rel);
  const dest = path.join(STAGE_DIR, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

// ── esbuild でバンドル（元のパスと同じ場所に出力） ────────────────────
await build({
  entryPoints: ENTRY_POINTS,
  outbase: ROOT,
  outdir: STAGE_DIR,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome100', 'firefox115'],
  sourcemap: 'inline',
  logLevel: 'info',
});

// ── manifest.json をターゲットごとに調整 ─────────────────────────────
const stageManifest = JSON.parse(fs.readFileSync(path.join(STAGE_DIR, 'manifest.json'), 'utf-8'));

if (target === 'firefox') {
  const serviceWorker = stageManifest.background.service_worker;
  delete stageManifest.background.service_worker;
  stageManifest.background.scripts = [serviceWorker];
  stageManifest.browser_specific_settings = {
    gecko: {
      id: '{extension-id}@example.com',
      strict_min_version: '109.0',
      data_collection_permissions: { required: ['none'], optional: [] },
    },
  };
}

fs.writeFileSync(
  path.join(STAGE_DIR, 'manifest.json'),
  JSON.stringify(stageManifest, null, 2) + '\n'
);

// ── ZIP 化 ──────────────────────────────────────────────────────────
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
const outFile = path.join(DIST_DIR, `${name}-${version}-${target}.zip`);
if (fs.existsSync(outFile)) fs.unlinkSync(outFile);

execSync(`cd "${STAGE_DIR}" && zip -r "${outFile}" . -x "*.DS_Store"`, { stdio: 'inherit' });

const stat = fs.statSync(outFile);
console.log(`\n[${target}] ${path.relative(ROOT, outFile)} (${(stat.size / 1024).toFixed(1)} KB)`);
