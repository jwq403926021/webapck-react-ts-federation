const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const generateFederationConfig = require('./federationConfig.cjs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dotenv = require('dotenv').config({
  path: path.join(__dirname, `../../.env.${process.env.BS_ENV}`),
});
const injectedEnv = Object.keys(dotenv.parsed).reduce((previousValue, key) => {
  previousValue[`process.env.${key}`] = `'${dotenv.parsed[key]}'`;
  return previousValue;
}, {})

const initModuleFederationConfig = generateFederationConfig({
  common: 'http://localhost:3002',
  app1: 'http://localhost:3001' // todo: when we build the project, we need to change the url to real server url base on (dotenv.parsed) .env parameter.
});

const isDev = !process.env.BS_ENV.includes('prod')
// console.log('host process.env:', process.env)

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/index.js'),
  },
  output: {
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
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
            loader: 'babel-loader',
            options: {
              plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true // only compile, do not check type during build. if you want to check type pls use fork-ts-checker-webpack-plugin
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
