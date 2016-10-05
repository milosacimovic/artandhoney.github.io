var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
if(process.env.NODE_ENV === 'production'){
  console.log('in production mode')
}else{
  console.log('in development mode')
}

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-hot-middleware/client');
    }

    return sources;
}

module.exports = {
  devtool: 'source-map',
  entry:getEntrySources(['./src/js/index.js']),
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? 'static/' :'http://localhost:3000/static/'
  },
  plugins:[
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.css", {
            allChunks: true
        })
  ],
  module:{
    loaders: [
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'style',
          process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract('css') : 'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: path.join(__dirname, 'src'),
        loaders: [
          'url?limit=8192',
          'img'
        ]
      },{
        test: /\.(woff|woff2|eot|ttf)/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'url?limit=8192'
        ]
      },
    {
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }
  ]
  },
  devServer:{
    contentBase: __dirname,
    inline: true,
    noInfo: true
  }
}
