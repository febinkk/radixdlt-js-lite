/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

let libraryName = pkg.name;

let outputFile, mode;

if (env === 'build') {
  mode = 'production';
  outputFile = libraryName + '.min.js';
} else {
  mode = 'development';
  outputFile = libraryName + '.js';
}

const config = {
  mode: mode,
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader'
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader'
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  }
};

module.exports = config;
