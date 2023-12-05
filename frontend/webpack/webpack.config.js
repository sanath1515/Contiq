const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      },
      {
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js'
  },
  mode: 'development',
  plugins: [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, '..', './src/index.html'),
      }),  
    new Dotenv(),
    new CopyPlugin({
        patterns: [{ from: 'public', to: '', noErrorOnMissing: true }],
      })
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: true
  }
};