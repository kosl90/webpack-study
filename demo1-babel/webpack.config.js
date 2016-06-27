module.exports = {
  entry: "./index.js",
  output: {
    path: "build",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'  // transform a small image which is below 60Kb to data url.
      }
    ]
  }
}
