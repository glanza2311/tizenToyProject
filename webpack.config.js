const path = require('path');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/app.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'Tedx'),
    filename: 'js/app.min.js',
  },
  module: {
    rules: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
           presets: ["es2015", 'env', 'stage-0']
        }
    }]
  }
}