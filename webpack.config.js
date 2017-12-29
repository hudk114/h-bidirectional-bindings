const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [
      __dirname + '/src/index.js',
      __dirname + '/build/client.js'
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'app.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: __dirname + '/src/index.tmpl.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
