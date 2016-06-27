var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    // 'webpack/hot/dev-server',
    './index.js'
  ],
  output: {
    path: "build",
    filename: 'bundle.js',
    publicPath: "build/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    inline: true,
  }
};
