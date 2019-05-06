import * as express from 'express'
import * as correlator from 'express-correlation-id'
import { correlationAwareService } from './correlationAwareService';

export default () => {
	console.log("hello world!!!")

	const app = express()

	app.use(correlator()) // Note: remember the paranthesis
	app.post('/service', (req, res) => {
		res.
			json(correlationAwareService())
// 			.
// 			sendStatus(200)
	})

	const port = parseInt(process.env.PORT || "3010")
	console.log(`Listening on port ${port}`)
	app.listen(port)
}
