# Gumbo Millennium plugin

[![Build status][shield-build]][link-build]
[![Javascript code style: Standard][shield-js]][link-js]
[![PHP code style: PSR-2][shield-php]][link-php]
[![Mozilla Public License v2][shield-license]][link-license]

These are the plugins for the Gumbo Millennium website. It's recommended to deploy this plugin as a [must-use plugin][1].

The stylesheets and scripts are built using Laravel's Mix.

[1]: https://codex.wordpress.org/Must_Use_Plugins

## License

The software is licensed under the [Mozilla Public License v2][link-license].

## Developing

To work on the plugin, run the following commands

```
composer install
yarn install
```

Lastly, to automatically build the Javascript and Sass files, run the following command:

```
yarn start
```

If you added, renamed or removed PHP files, make sure to update the Composer autoloader!

```
composer dump-autoload
```

## Deployment

The files should be auto-deployed by the Continuous Integration, but if you want to build
your own, you can!

```
make plugin.zip
```

<!--
    All the links
-->

<!-- Badges -->
[shield-build]: https://travis-ci.com/gumbo-millennium/wordpress-plugins.svg?branch=master
[link-build]: https://travis-ci.com/gumbo-millennium/wordpress-plugins

[shield-js]: https://img.shields.io/badge/js%20code%20style-standard-brightgreen.svg
[link-js]: https://standardjs.com/

[shield-php]: https://img.shields.io/badge/php%20code%20style-PSR--2-8892be.svg
[link-php]: https://www.php-fig.org/psr/psr-2/

[shield-license]: https://img.shields.io/badge/license-Mozilla%20Public%20License%20version%202.0-orange.svg
[link-license]: LICENSE.md
