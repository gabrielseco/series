/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

module.exports = {
  context:__dirname,
  output: {
    filename: 'main.js',
    publicPath: './assets/',
    path:'/src/assets'
  },

  cache: true,
  debug: true,
  devtool: false,
  entry: [
      'webpack/hot/only-dev-server',
      './src/scripts/components/main.jsx'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js','.jsx'],
    alias: {
      'styles': './src/scripts/styles',
      'components': './src/scripts/components/'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015','react','stage-0'],
          plugins: ["transform-runtime"],
          cacheDirectory: true
        }
      },
    {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }
  ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
