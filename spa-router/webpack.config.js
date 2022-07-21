const path = require('path')

module.exports = env => ({
  mode: env.production ? 'production' : 'development',
  entry: './src/Router.ts',
  watch: !env.production,
  output: {
    globalObject: 'this',
    library: {
      name: 'Router',
      type: 'umd'
    },
    filename: './build/bundle.js',
    path: path.resolve(__dirname, 'out')
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  }
})
