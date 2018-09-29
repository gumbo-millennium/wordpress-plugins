.PHONY: plugin.zip

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
		README.md \
		plugin.php

	# Copy plugin.php to temporary dir
	cp plugin.php temp/plugin.php

	# Update version in temporary plugin copy
	sed -i -r \
		"s/^( \* Version:\s+).+$$/\1$(shell git log -n1 --pretty='%h')/" \
		temp/plugin.php

	# Force the modified time to update
	touch temp/plugin.php

	# Add plugin file
	zip -f --junk-paths \
		temp/new.zip \
		temp/plugin.php

	# Delete temporary file
	rm temp/plugin.php

	# Move file over old plugin file
	mv temp/new.zip gumbo-millennium.zip

	# Delete temporary directory (if empty)
	rmdir --ignore-fail-on-non-empty temp/
