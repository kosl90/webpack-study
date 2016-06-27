module.exports = {
  entry: "./index.js",
  output: {
    path: "build",
    filename: "bundle.js",
    publicPath: "build/"  // maybe csdn for performance
  },
  module: {
    loaders: [
      {
        test: /\.png$/,
        loader: 'url-loader?limit=60000'  // transform a small image which is below 60Kb to data url.
      }
    ]
  }
}
