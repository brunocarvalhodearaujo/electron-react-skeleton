const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const { dependencies } = require('./package.json')

module.exports = {
  target: 'electron-renderer',
  entry: path.join(__dirname, 'src'),
  externals: Object.keys(dependencies || {}),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'build'),
    publicPath: './',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // If you are having trouble with urls not resolving add this setting.
              // See https://github.com/webpack-contrib/css-loader#url
              url: false,
              minimize: true,
              sourceMap: false
            }
          }
          ]
        })
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.css'
    ],
    modules: [
      'node_modules'
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'public'), to: path.join(__dirname, 'public') }
    ]),
    new webpack.EnvironmentPlugin({ NODE_ENV: process.env.NODE_ENV || 'production' }),
    new ExtractTextPlugin('style.css'),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      inject: 'body',
      hash: true,
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new LiveReloadPlugin({ appendScriptTag: true })
  ]
}
