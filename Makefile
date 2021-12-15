build: html pdf html	## Build 🏗

html:
	blackfriday-tool README.md src/README.html
	npx webpack --mode production

#chromehtml2pdf:
#	# BUG: https://bugs.chromium.org/p/chromium/issues/detail?id=840455
#	chromehtml2pdf --out="src/Kamil Dziedzic - Software Engineer.pdf" file:///Users/nil/local/resume/docs/index.html

pdf:
	sed -i '' 's/“/\\201C/g;s/”/\\201D/g' docs/main.css
	# BUG: https://github.com/wkhtmltopdf/wkhtmltopdf/issues/2913
	wkhtmltopdf	\
				--encoding utf-8 \
				--print-media-type \
				--user-style-sheet docs/main.css \
				--title "Curriculum vitae" \
				src/README.html \
				src/"Kamil Dziedzic - Software Engineer.pdf"

npm:
	npm install -g npm@latest

node:
	. ${NVM_DIR}/nvm.sh && nvm install node

update: npm node		## Update dependencies
	npm update

upgrade:				## Upgrade dependencies
	node -v > .nvmrc

help: Makefile			## Display this help message
	@echo "USAGE:	make TARGET\n\nTARGETS:"
	@grep '^[a-zA-Z]' $(MAKEFILE_LIST) | \
		sort | \
		awk -F ':.*?## ' 'NF==2 {printf "  %-26s%s\n", $$1, $$2}'

.DEFAULT_GOAL := help
.PHONY: build
