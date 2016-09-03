/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

const webpack = require('webpack');
const  path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const join    = path.join;
const resolve = path.resolve;

const root    = resolve(__dirname);
const src     = join(root, 'src');

module.exports = {
  devtool: false,
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'main.js',
    publicPath: '/assets'
  },
  entry: './src/scripts/main.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
          compressor: {
            screw_ie8: true,
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin("styles.css")

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

  module: {
    loaders: [
      {
      test: /\.js$/,
      loaders: ['react-hot', 'babel','eslint'],
      include: path.join(__dirname, 'src')
      },
      {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss/,
      //loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap')

    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
