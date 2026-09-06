#!/usr/bin/env bash
# Build the Chrome/Firefox submission zips for the tag at HEAD and publish a
# GitHub Release.
#
# Mirrors what .github/workflows/release.yml does on `git push --tags`, so a
# release can still be cut from a local machine when Actions is unavailable
# (e.g. a billing/spending-limit failure blocks the workflow run).
#
# Usage:
#   git tag v1.2.3 && git push origin v1.2.3   # if not already tagged/pushed
#   scripts/release.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

if ! command -v gh &>/dev/null; then
  echo "Error: gh CLI not found. Install it: https://cli.github.com" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: working tree is not clean; commit or stash changes first" >&2
  exit 1
fi

TAG=$(git tag --points-at HEAD | head -n 1)
if [[ -z "$TAG" ]]; then
  echo "Error: HEAD is not tagged. Run: git tag v<version>" >&2
  exit 1
fi

TAG_VERSION="${TAG#v}"
MANIFEST_VERSION=$(node -p "require('./manifest.json').version")
PKG_VERSION=$(node -p "require('./package.json').version")
# shellcheck disable=SC2055 # intentional: error if the tag mismatches EITHER version
if [[ "$TAG_VERSION" != "$MANIFEST_VERSION" || "$TAG_VERSION" != "$PKG_VERSION" ]]; then
  echo "Error: tag $TAG does not match manifest.json ($MANIFEST_VERSION) / package.json ($PKG_VERSION)" >&2
  exit 1
fi

echo "→ Building $TAG"
npm run build

echo "→ Checksums"
(cd dist && shasum -a 256 *.zip > checksums.txt)

echo
echo "About to publish GitHub Release ${TAG} with:"
ls -la dist/*.zip dist/checksums.txt
echo

read -r -p "Push tag (if needed) and create the release now? [y/N] " reply
if [[ ! "$reply" =~ ^[Yy]$ ]]; then
  echo "Aborted; dist/ artifacts are left in place for inspection."
  exit 0
fi

if ! git ls-remote --exit-code --tags origin "$TAG" >/dev/null 2>&1; then
  git push origin "$TAG"
fi

gh release create "$TAG" dist/*.zip dist/checksums.txt \
  --title "$TAG" \
  --generate-notes

echo "✓ Release $TAG created"
