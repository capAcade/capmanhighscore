const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './test/main.js',
  mode:'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([
        {from: './src/html/**/*', to:'', flatten: true},
        {from: './vendor/**/*', to:'', flatten: true},
        {from: './assets/img/**/*', to: ''},
        {from: './assets/levels/**/*', to: ''}
    ])
  ]
};
