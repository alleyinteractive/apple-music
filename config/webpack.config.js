// Webpack dependencies
const path = require('path');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',

  entry: {
    block: [
      './src/block/index.js',
      './src/styles/block-styles.css',
    ],
    mediaModal: [
      './src/media-modal/media-modal.js',
      './src/media-modal/media-modal.css',
    ],
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

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: path.join(__dirname, '../src/block'), // exclude Gutenberg block.
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: {
                autoprefixer: false,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: path
                  .resolve(__dirname, './config/postcss.config.js'),
              },
            },
          },
        ],
      },
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
        include: path.join(__dirname, '../src/block'),
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
