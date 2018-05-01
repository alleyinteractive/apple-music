// Webpack dependencies
const path = require('path');

module.exports = (env) => ({
  entry: {
    block: './src/block/index.js',
    mediaModal: './src/media-modal/media-modal.js',
  },

  output: {
    filename: env.production ?
      'js/[name].bundle.min.js' :
      'js/[name].bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/wp-content/plugins/apple-music/dist/',
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
              config: {
                path: path
                  .resolve(__dirname, './config/postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../../src/images/[name].[ext]',
              outputPath: '../dist/images',
            },
          },
        ],
      },
    ],
  },
});
