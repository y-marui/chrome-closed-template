# {Project Name}

> **This is the reference (English) version.**
> The canonical (Japanese) version is [README-jp.md](README-jp.md).

[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](LICENSE)
[![CI](https://github.com/{user}/{repo}/actions/workflows/{workflow}.yml/badge.svg)](https://github.com/{user}/{repo}/actions/workflows/{workflow}.yml)
[![Charter Check](https://github.com/{user}/{repo}/actions/workflows/dev-charter-check.yml/badge.svg)](https://github.com/{user}/{repo}/actions/workflows/dev-charter-check.yml)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/[USERNAME]?style=social)](https://github.com/sponsors/[USERNAME])
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-donate-yellow.svg)](https://www.buymeacoffee.com/[BMC_USERNAME])

{One-line description: what it does, who it's for, how it solves the problem.}

## Setup

Requires Node.js v20+ and [pre-commit](https://pre-commit.com).

```sh
npm install
pre-commit install          # install git hooks
pre-commit run --all-files  # verify hooks
npm test                    # verify tests
```

Load the extension (build first — `npm run build` builds both Chrome and Firefox):

1. Run `npm run build`
2. Open `chrome://extensions` in Chrome, enable Developer Mode
3. Click "Load Unpacked" and select `stage/chrome/`

## Usage

```sh
npm test                    # run unit tests
npm run build                # build both Chrome and Firefox ZIPs in dist/
npm run build:chrome         # generate the Chrome Web Store ZIP in dist/
npm run build:firefox        # generate the Firefox AMO ZIP in dist/
pre-commit run --all-files  # run all security/quality hooks
```

## License

Copyright (c) [YEAR] [AUTHOR]. All Rights Reserved — see [LICENSE](LICENSE) for details.

## Privacy Policy

- URL: {privacy_policy_url}
