const mix = require('laravel-mix')

// Configure root path
mix
  .setPublicPath('dist/')

// Configure javascript and Scss
mix
  .js('lib/js/plugin.js', 'dist/gumbo-plugin.js')
  .react('lib/jsx/main.js', 'dist/gutenberg.js')
  .sass('lib/sass/plugin.scss', 'dist/gumbo-plugin.css')
  .sass('lib/sass/gutenberg.scss', 'dist/gutenberg.css')

// Add source maps if not in production
if (!mix.inProduction()) {
  mix.sourceMaps()
}

// Linters
mix.webpackConfig({
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          failOnError: true,
          failOnWarning: true
        }
      }
    ]
  }
})
