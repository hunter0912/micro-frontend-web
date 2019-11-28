const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('../config');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '../'),
  entry: {
    'win-iframe': './src/index.js',
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
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
        include: [resolve('src')],
        exclude: [resolve('src/utils/system.js')]
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser
  }
};