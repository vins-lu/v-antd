const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../../example/index.tsx'),
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: 'localhost',
    port: '3003',
    clientLogLevel: 'warning',
    open: true,
    hot: true,
    quiet: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    progress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
