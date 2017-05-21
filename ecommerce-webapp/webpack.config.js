const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');

var config = {
  devtool: debug ? 'inline-sourcemap' : null,
  entry:  path.join(__dirname, 'src', 'index.jsx'),
  devServer: {
      inline: true,
      port: 3333,
      contentBase: "src/static/",
      historyApiFallback: {
        index: '/index.html'
      }
    },
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    publicPath: "/js/",
    filename: 'bundle.js'
  },
    module : {
     loaders: [{
      test: path.join(__dirname, 'src'),
      loader: ['babel-loader'],
      query: {
        cacheDirectory: 'babel_cache',
        presets: debug ? ['react', 'es2015'] : ['react', 'es2015']
      }
    }]
    }
,
   plugins: debug ? [] : [
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
     }),
     new webpack.optimize.DedupePlugin(),
     new webpack.optimize.OccurenceOrderPlugin(),
     new webpack.optimize.UglifyJsPlugin({
       compress: { warnings: false },
       mangle: true,
       sourcemap: false,
       beautify: false,
       dead_code: true
     }),
   ]
 };

module.exports = config;