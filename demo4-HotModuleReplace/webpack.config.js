var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: "build",
    filename: 'bundle.js',
    publicPath: "/static/",
  },
};
