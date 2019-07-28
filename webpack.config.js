const path = require('path');
const webpack = require('webpack');

module.exports = env => ({
	entry: {
		index: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './gui/index.tsx'],
		vendor: ['react', 'react-dom', 'recharts']
	},
	devtool: 'inline-source-map',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [
							[
								"@babel/preset-env",
								{ targets: { browsers: "last 2 versions" } } // or whatever your project requires
							],
							"@babel/preset-typescript",
							"@babel/preset-react"
						],
						plugins: ["react-hot-loader/babel"]
					}
				},
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},
	output: {
		filename: '[name]_bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/static/'
	}
});