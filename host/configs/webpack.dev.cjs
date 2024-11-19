const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const SingleReactRefresh = require("single-react-refresh-plugin")
const webpackBaseConfig = require('./webpack.base.cjs');

// @ts-ignore
module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval',
  cache: false,
  optimization: {
    minimize: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 4000,
    hot: true,
    open: true,
    compress: false,
    historyApiFallback: true,
  },
  plugins: [new ReactRefreshWebpackPlugin(), new SingleReactRefresh()]
});
