const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');
const path = require('path');

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    open: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        logLevel: 'debug'
      }
    }
  }
});
