import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import { createSchema } from './schema';
import { GraphQLSchema } from 'graphql';

type IGraphQlReqType = express.Request & {files: any[], logs: {logs: any[]}}

export const setupGraphQLEndpoint = function<TRootValue extends {} & {dataAccess: TDataAccess}, TDataAccess>(apiUrlPath: string, schema: GraphQLSchema, router: express.Router) {

	router.use(apiUrlPath, graphqlHTTP((req: IGraphQlReqType, res) =>
		(<graphqlHTTP.OptionsResult>{
			schema,
			graphiql: true,
			rootValue: {
				house: {
					address: "Hola Drive 10",
					owner: "Mr Duck",
				},
				getNumber: () => 10
			},
		})))
}


export default () => {
	const app = express()

	const router = express.Router()

	const apiUrlPath = "/publicgraphql"
	const schema = createSchema()

	setupGraphQLEndpoint(apiUrlPath, schema, router)

	app.use(router)

	const port = parseInt(process.env["port"] || "3000")

	app.listen(port, function (err, result) {
		if (err) {
			return console.log(err);
		}

		console.log(`Listening at http://*:${port}/`);
	});
}