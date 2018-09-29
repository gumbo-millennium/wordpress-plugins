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

// Banner
mix.webpackConfig(webpack => {
  const banner = `
  Gumbo Millennium plugin for WordPress

  Version:         1.0.0
  Hash:            [hash]
  License:         MPL-2.0
  License URI:     https://www.mozilla.org/en-US/MPL/2.0/
  `
  return {
    plugins: [
      // Banners
      new webpack.BannerPlugin({
        test: /\.(js|css)$/,
        banner: banner
      })
    ]
  }
})
