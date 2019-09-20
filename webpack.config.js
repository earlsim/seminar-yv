const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')


module.exports = {
  entry: { main: './src/js/app.js' },
  output: {
    // path: path.resolve(),
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/bundle.js'
  },
  target: 'node',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
          output: {
              comments: false
          }
        }
      })
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader']
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|svg|gif|jpg)$/,
        use: [{
            loader: 'url-loader'
        }]
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    }),
    new CopyWebpackPlugin([
      {from: 'src/img/', to: 'assets/img/',},
      {from: 'src/fonts/', to: 'assets/fonts/',}
    ]),
    new MiniCssExtractPlugin({
      filename: 'assets/css/styles.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
};