'use strict'
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    //   {
    //      test: /[\/\\]node_modules[\/\\]oauthio-web[\/\\]dist[\/\\]oauth.min\.js$/,
    //      loader: "legacy"
    //  }
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
    extensions: ['', '.js'],
  }
}
