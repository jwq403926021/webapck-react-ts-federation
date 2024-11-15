const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const { ModuleFederationPlugin } = webpack.container;
const federationConfig = require('./federationConfig.cjs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dotenv = require('dotenv').config({
  path: path.join(__dirname, `../../.env.${process.env.BS_ENV}`),
});
const injectedEnv = Object.keys(dotenv.parsed).reduce((previousValue, key) => {
  previousValue[`process.env.${key}`] = `'${dotenv.parsed[key]}'`;
  return previousValue;
}, {})

const initModuleFederationConfig = federationConfig({
  APP1: 'http://localhost:3001' // todo: when we build the project, we need to change the url to real server url base on (dotenv.parsed) .env parameter.
});

const isDev = !process.env.BS_ENV.includes('prod')
// console.log('host process.env:', process.env)

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(c|sc)ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true  // 加速编译，并使用 Babel 处理最终的转换
            }
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(injectedEnv),
    new ModuleFederationPlugin(initModuleFederationConfig),
    new FederatedTypesPlugin({
      federationConfig: initModuleFederationConfig,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      title: 'Host App',
      chunks: ['main'],
      publicPath: '/',
      favicon: path.join(__dirname, '../public/favicon.ico'),
    }),
    ...(
      isDev ? [] : [new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })]
    )
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.css', '.scss', '.jpg', '.jpeg', '.png'],
  },
};
