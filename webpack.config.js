// Webpack dependencies
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => ({
  entry: {
    blocks: './blocks/index.js',
  },

  output: {
    filename: env.production ?
      'js/[name].bundle.min.js' :
      'js/[name].bundle.js',
    path: path.resolve(__dirname, 'assets'),
  },

  resolve: {
    modules: [
      'node_modules',
    ]
  },

  devtool: env.production ? 'source-map' : 'cheap-module-source-map',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /\.min\.js$/,
        ],
        use: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  }
});
