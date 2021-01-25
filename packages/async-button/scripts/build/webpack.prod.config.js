const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: path.resolve(__dirname, '../../src/index.tsx'),
  output: {
    libraryTarget: 'commonjs2',
  },
  externals: ['react', 'antd', 'antd/sun'],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        sourceMap: true,
      }),
      new UglifyJsPlugin({
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 单独的进程进行类型检查
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig/tsconfig.prod.json'),
    }),
  ],
}
