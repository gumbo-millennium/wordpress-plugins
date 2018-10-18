.PHONY: plugin.zip install lint

install:
	composer install --no-progress --no-suggest -an
	yarn install --frozen-lockfile

lint:
	# Lint PHP code
	vendor/bin/phpcs

	# Lint Sass files
	find lib/sass -type f -name '*.scss' -print | xargs node_modules/.bin/stylelint

	# Lint Javascript
	find lib/ -type f -name '*.js' -print | xargs node_modules/.bin/eslint
	find lib/ -type f -name '*.jsx' -print | xargs node_modules/.bin/eslint

plugin.zip: gumbo-millennium.zip
	cp gumbo-millennium.zip plugin.zip

gumbo-millennium.zip:
	# Install dependencies
	composer install \
		--no-dev \
		--no-suggest \
		--no-autoloader \
		--no-interaction

	# Clean up autoloader
	composer dump-autoload \
		--no-dev \
		--classmap-authoritative \
		--no-interaction

	# Install / update Yarn
	yarn install \
		--non-interactive

	# Build production output
	yarn run production

	# Build temporary directory
	test -d temp || mkdir temp

	# Zip files
	zip -r \
		temp/new.zip \
		dist/ \
		src/ \
		vendor/ \
		LICENSE.md \
		README.md

	# Update version and write to temporary plugin file
	sed -r \
		"s/^( \* Version:\s+).+$$/\1$(shell git log -n1 --pretty='%h')/" \
		plugin.php > temp/plugin.php

	# Force the modified time to update
	touch temp/plugin.php

	# Add plugin file
	zip -u --junk-paths \
		temp/new.zip \
		temp/plugin.php

	# Delete temporary file
	rm temp/plugin.php

	# Move file over old plugin file
	mv temp/new.zip gumbo-millennium.zip

	# Delete temporary directory (if empty)
	rmdir --ignore-fail-on-non-empty temp/
