const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const utils = require('./utils');

const config = require('../config');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '../'),
  entry: {
    singleSpaEntry: './src/singleSpaEntry.js',
  },
  output: {
    publicPath: (config.dev.https ? 'https://' : 'http://') + config.dev.host + ':' + config.dev.port + '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
    library: 'win-base'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {

  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    })
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};