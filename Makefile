.PHONY: help test build build-firefox update-charter

help: ## コマンド一覧を表示
	@grep -E '^[a-zA-Z_-]+:.*##' $(MAKEFILE_LIST) \
	  | awk 'BEGIN {FS = ":.*##"}; {printf "  %-20s %s\n", $$1, $$2}'

test: ## ユニットテストを実行
	npm test

build: ## Chrome Web Store 提出用 ZIP を dist/ に生成
	npm run build:chrome

build-firefox: ## Firefox AMO 提出用 ZIP を dist/ に生成
	npm run build:firefox

update-charter: ## dev-charter を最新版に更新 (git subtree pull)
	CHARTER_UPDATE_ONLY=1 bash <(curl -fsSL https://raw.githubusercontent.com/y-marui/dev-charter/main/scripts/install.sh)
