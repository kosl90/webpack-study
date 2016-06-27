var path = require("path");
var CleanPlugin = require("clean-webpack-plugin");
var webpack = require("webpack");

const SRC_PATH = path.resolve(__dirname);

module.exports = {
  entry: SRC_PATH,
  output: {
    path: "build",
    filename: "bundle.js",
    publicPath: "build"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        include: SRC_PATH,
      },
      {
        test: /\.css$/,
        loader: "style!css",
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    new CleanPlugin("build"),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    inline: true
  }
}
