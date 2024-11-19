const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const SingleReactRefresh = require("single-react-refresh-plugin")
const webpackBaseConfig = require('./webpack.base.cjs');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 3001,
    liveReload: false,
    hot: true,
    open: true,
    compress: false,
    historyApiFallback: true,
  },
  plugins: [new ReactRefreshWebpackPlugin(), new SingleReactRefresh()]
});
