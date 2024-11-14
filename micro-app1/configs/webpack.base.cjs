const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const { ModuleFederationPlugin } = webpack.container;
const federationConfig = require('./federationConfig.cjs');

// console.log('micro-app1 process.env:', process.env)

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
            loader: 'babel-loader',
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
    new ModuleFederationPlugin(federationConfig),
    new FederatedTypesPlugin({
      federationConfig,
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'app1',
      filename: 'index.html',
      chunks: ['main'],
      publicPath: '/',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.css', '.scss', '.jpg', '.jpeg', '.png'],
  },
};
