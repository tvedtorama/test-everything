import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from 'graphql-tools';
import {Maybe, Some} from 'monet'

type IGraphQlReqType = express.Request & {files: any[], logs: {logs: any[]}}

export interface IHouse {
	address: string,
	owner: string
}

export const setupGraphQLEndpoint = function<TRootValue extends {} & {dataAccess: TDataAccess}, TDataAccess>(apiUrlPath: string, schema: GraphQLSchema, router: express.Router) {

	router.use(apiUrlPath, graphqlHTTP((req: IGraphQlReqType, res) =>
		(<graphqlHTTP.OptionsResult>{
			schema,
			graphiql: true,
			rootValue: {
				house: <IHouse>{
					address: "Hola Drive 10",
					owner: "Mr Duck",
				},
				getNumber: () => 10
			},
		})))
}

export const setupGraphQL = async (getSchema: () => Promise<GraphQLSchema>, otherSchema?: () => Promise<GraphQLSchema>) => {
	const schema = await Some(await getSchema()).
		map(async (schema) => otherSchema ?
			mergeSchemas({schemas: [schema, await otherSchema()]}) :
			Promise.resolve(schema)).
		some()

	const app = express()

	const router = express.Router()

	const apiUrlPath = "/publicgraphql"

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