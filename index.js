const serverApp = process.env["serverApp"] || "server"

const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
	version: '0.0.9',
	addHelp: true,
	description: 'Test everything!'
});
parser.addArgument(
	['-w', '--webpack'],
	{
		help: 'Build and refresh webpack bundle',
		action: "storeTrue",
		nargs: 0,
	});

const args = parser.parseArgs()

const main = require(`./build/${serverApp}/main`)

// Note: Not all impl support the argument so this will not work with all
main.default(app => {
	if (args["webpack"]) {
		const config = require('./webpack.config')(process.env);
		const webpack = require('webpack');
		const webpackMiddleware = require("webpack-dev-middleware");

		const compiler = webpack(config)

		app.use(webpackMiddleware(compiler, {
			publicPath: config.output.publicPath,
			hot: true,
			historyApiFallback: true,
		}))

		app.use(require("webpack-hot-middleware")(compiler));
	}
})
