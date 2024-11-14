const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const federationConfig = require('./federationConfig.cjs');

// const dotenv = require('dotenv').config({
//   path: path.join(__dirname, '../.env'),
// });

const initModuleFederationConfig = federationConfig({
  APP1: 'http://localhost:3001'
});

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
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader'],
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
    // new webpack.DefinePlugin({
    //   'process.env': dotenv.parsed,
    // }),

    new ModuleFederationPlugin(initModuleFederationConfig),

    new FederatedTypesPlugin({
      federationConfig: initModuleFederationConfig,
    }),

    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'Host App',
      filename: 'index.html',
      chunks: ['main'],
      publicPath: '/',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.css', '.scss', '.jpg', '.jpeg', '.png'],
  },
};
