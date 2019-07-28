const path = require('path');

module.exports = {
  entry: {
	  index: './gui/index.tsx',
	  vendor: ['react', 'react-dom', 'recharts']
	},
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
	filename: '[name]_bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};