var express = require('express')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpack = require('webpack')
var config = require('./webpack.config')

var compiler = webpack(config)
var port = 3000
var app = express()

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.listen(port, function(err){
  if(err){
    console.log('Error: ' + err)
  }else{
    console.log('Listening on port %s ===> Open up browser and go to localhost:%s', port, port)
  }
})
