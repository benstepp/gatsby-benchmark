setup:
	@npm install
	@mv node_modules/gatsby node_modules/gatsbyold &> /dev/null || true
	@ln -s "$(shell pwd)/../gatsby" "$(shell pwd)/node_modules/gatsby"

new:
	@rm node_modules/gatsby &> /dev/null || true
	@ln -s "$(shell pwd)/../gatsby" "$(shell pwd)/node_modules/gatsby"

old:
	@rm node_modules/gatsby &> /dev/null || true
	@ln -s "$(shell pwd)/node_modules/gatsbyold" "$(shell pwd)/node_modules/gatsby"

build:
	@rm -rf public
	@node generate-posts.js
	@gtime -v gatsby build

huge:
	@rm -rf public
	@POST_COUNT=5000 node generate-posts.js
	@gtime -v gatsby build

.PHONY: setup new old rebuild build huge
