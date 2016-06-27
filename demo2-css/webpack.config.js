module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: "build"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css",
        include: __dirname
      }
    ]
  }
}
