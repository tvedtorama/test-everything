const main = require(`./build/server/main`)
	
// Tried to make an IMain for this, to use in the implementation - but it turned out to be virtually impossible to find a referenceable type for app.
main.default(app, args)
