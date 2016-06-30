var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './index.js'
  ],
  output: {
    path: path.resolve("build"),
    filename: 'bundle.js',
    publicPath: "/static/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0'
  }
};

