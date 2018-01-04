const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const express = require('express')
var app = express()

const complier = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(complier, {
  publicPath: '/',
  stats: {
    colors: true,
  }
})
app.use(devMiddleware)

const hotMiddleware = require('webpack-hot-middleware')(complier, {
  log: false,
  heartbeat: 2000
})
app.use(hotMiddleware)

complier.plugin('compilation', compilation => {
  console.log('compilation')
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb();
  })
})

app.listen(8080)