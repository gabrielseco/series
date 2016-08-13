/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
const webpack = require('webpack');
const path = require('path');

const join    = path.join;
const resolve = path.resolve;

const root    = resolve(__dirname);
const src     = join(root, 'src');

const ExtractTextPlugin = require('extract-text-webpack-plugin');




module.exports = {
  context:__dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: false,
  entry: [
    'webpack-dev-server/client?http://localhost:8000', // WebpackDevServer host and port
      'webpack/hot/only-dev-server',
      './src/scripts/main.js'
  ],

  resolve:{
    root: root,
    extensions: ['', '.js', '.jsx'],
    alias:{
      'actions'   : join(root, './src/scripts/actions'),
      'constants' : join(root, './src/scripts/constants'),
      'components': join(root, './src/scripts/components'),
      'containers': join(root, './src/scripts/containers'),
      'reducers'  : join(root, './src/scripts/reducers'),
      'styles'    : join(root, './src/scripts/styles')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new ExtractTextPlugin("styles.css")

  ],
  module: {
    loaders: [
      {
      test: /\.js$/,
      loaders: ['react-hot', 'babel','eslint'],
      include: path.join(__dirname, 'src')
      },
    {
      test: /\.scss/,
      //loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap')

    },
    {
        test: /\.css/,
        loader: "style-loader!css-loader"
    }
   ]
  }

};
