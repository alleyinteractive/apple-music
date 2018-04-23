// Webpack dependencies
const path = require('path');

const stylelint = require('stylelint');
const stylelintConfig = require('./assets/config/stylelint.config.js');
const autoprefixer = require('autoprefixer');

module.exports = (env) => ({
  entry: {
    blocks: './blocks/index.js',
  },

  output: {
    filename: env.production ?
      'js/[name].bundle.min.js' :
      'js/[name].bundle.js',
    path: path.join(__dirname, 'assets'),
  },

  resolve: {
    modules: [
      'node_modules',
    ],
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
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer,
                stylelint(stylelintConfig),
              ],
            },
          },
        ],
      },
    ],
  },
});
