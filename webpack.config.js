const path = require('path');
const webpack = require('webpack');

module.exports = env => ({
  entry: {
	  index: ['webpack-hot-middleware/client', './gui/index.tsx'],
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
  plugins: [
	new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
	filename: '[name]_bundle.js',
	path: path.resolve(__dirname, 'dist'),
	publicPath: '/static/'
  }
});