.PHONY: plugin.zip

plugin.zip:
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

    # Zip files
	zip -r \
		plugin-new.zip \
		dist/ \
		src/ \
		vendor/ \
		README.md \
		LICENSE.md

    # Create temporary directory and copy plugin
	mkdir temp
	cp plugin.php temp/plugin.php

    # Update version in new plugin file
	sed -i -r \
		"s/^( \* Version:\s+).+$$/\1$(shell git log -n1 --pretty='%h')/" \
		temp/plugin.php

    # Add plugin file
	zip --freshen --junk-paths \
        plugin-new.zip \
        temp/plugin.php

    # Delete temp file and directory (if empty)
	rm temp/plugin.php
	rmdir --ignore-fail-on-non-empty temp/

    # Move file over old plugin file
	mv plugin-new.zip plugin.zip
