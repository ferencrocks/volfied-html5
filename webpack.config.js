var path = require('path');
var HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      Canvas: path.resolve(__dirname, 'src/app/canvas/'),
      Control: path.resolve(__dirname, 'src/app/controls/'),
      Object: path.resolve(__dirname, 'src/app/objects/'),
      Stage: path.resolve(__dirname, 'src/app/stages/'),
      Style: path.resolve(__dirname, 'src/app/style/')
    }
  },
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLPlugin({
      title: 'Volfied HTML5',
      template: './src/index.html'
    })
  ]
};
