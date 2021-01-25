const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

module.exports = (env, argv) => {
  const config = argv.mode === 'development' ? require('./webpack.dev.config.js') : require('./webpack.prod.config.js')

  return merge(baseConfig(argv.mode), config)
}
