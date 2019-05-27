const serverApp = process.env["serverApp"] || "server"

const main = require(`./build/${serverApp}/main`)
	
main.default()
