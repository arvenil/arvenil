build:	                  ## Build.
	#md2pdf -title "Kamil Dziedzic" -html README.md src/README.html
	blackfriday-tool README.md src/README.html
	npx webpack --mode production
	gulp
	wkhtmltopdf --encoding utf-8 --print-media-type --user-style-sheet docs/main.css src/README.html src/"Kamil Dziedzic - Software Engineer.pdf"

help: Makefile            ## Display this help message.
	@echo "Please use \`make <target>\` where <target> is one of:"
	@grep '^[a-zA-Z]' $(MAKEFILE_LIST) | \
		sort | \
		awk -F ':.*?## ' 'NF==2 {printf "  %-26s%s\n", $$1, $$2}'

.DEFAULT_GOAL := help
.PHONY: build
