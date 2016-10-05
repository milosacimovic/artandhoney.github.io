var path = require('path')
var webpack = require('webpack')



module.exports = {
  devtool: 'source-map',
  entry:{
    index: ['./src/js/index.js','webpack-hot-middleware/client'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:3000/static'
  },
  plugins:[
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module:{
    loaders: [
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
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
