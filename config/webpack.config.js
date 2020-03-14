const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/client/index.html',
  filename: './index.html'
});
module.exports = {
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
