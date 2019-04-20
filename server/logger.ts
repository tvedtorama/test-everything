import {createLogger, transports} from 'winston'

export const getLogger = () =>
	createLogger({
		transports: [
			new transports.Console()
		]
	})
