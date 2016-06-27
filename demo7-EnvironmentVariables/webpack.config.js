var webpack = require("webpack");
var CleanPlugin = require("clean-webpack-plugin");

const production = process.env.NODE_ENV === 'producion' || false;

var plugins = []

if (producion) {
  plugins.concat([
    new CleanPlugin('build'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warning: false
      }
    })
    new webpack.DefinePlugin({
      __DEVELOPMENT__: !production,
    })
  ])
}


module.exports = {
  debug: !production,
  devtool: production ? false : "eval",
  entry: "./index.js",
  output: {
    path: "build",
    filename: "bundle.js",
  },
  plugins: plugins,
}
