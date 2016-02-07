'use strict'
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('matter.js v' + pkg.version + ' | (c) Kyper Digital Inc.', {raw: false, entryOnly: true}),
  ],
  output: {
    library: 'Matter',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  }
}
