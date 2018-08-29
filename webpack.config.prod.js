const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  mode:'production',
  output: {
    filename: 'index.js',
    library: 'someLibName',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  }
};
