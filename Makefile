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
	git remote | grep -q '^dev-charter$$' || \
	  git remote add dev-charter https://github.com/y-marui/dev-charter
	git fetch dev-charter
	@STASHED=0; \
	if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$$(git ls-files --others --exclude-standard)" ]; then \
		git stash push -u -m "update-charter"; \
		STASHED=1; \
	fi; \
	git subtree pull --prefix=docs/dev-charter dev-charter main --squash; \
	if [ "$$STASHED" = "1" ]; then git stash pop; fi
