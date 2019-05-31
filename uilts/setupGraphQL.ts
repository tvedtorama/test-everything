import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import { GraphQLSchema, parse, DocumentNode } from 'graphql';
import { mergeSchemas, IResolversParameter, makeExecutableSchema } from 'graphql-tools';
import {Maybe, Some} from 'monet'

type IGraphQlReqType = express.Request & {files: any[], logs: {logs: any[]}}

export interface IHouse {
	address: string,
	owner: string
}

export const setupGraphQLEndpoint = function<TRootValue extends {} & {dataAccess: TDataAccess}, TDataAccess>(apiUrlPath: string, schema: GraphQLSchema, router: express.Router) {
	router.use(apiUrlPath, (req: IGraphQlReqType, _, next) => {
		if (req.headers && req.headers.authorization)
			console.log("Good, you know the secret: ", req.headers.authorization)
		next()
	})

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

type ISupportedSchemas = string | GraphQLSchema

interface ISchemaSet<T extends ISupportedSchemas | Promise<ISupportedSchemas> = ISupportedSchemas> {
	[index: string]: T
}

export const resolveSchemas = (schemas: ISchemaSet<ISupportedSchemas | Promise<ISupportedSchemas>>): Promise<ISchemaSet> =>
	Promise.all(Object.entries(schemas).map(async ([k, v]) => ({k, v: await Promise.resolve(v)}))).
		then(resolvedSchemaList => resolvedSchemaList.reduce((x, y) => ({...x, [y.k]: y.v}), <ISchemaSet>{}))

export const setupGraphQL = async (schemas: ISchemaSet, resolvers: (schemaSet: ISchemaSet) => IResolversParameter = () => ({})) => {

	const schema = Some(Object.values(schemas)).
		flatMap(schemaList => schemaList.length > 1 ?
			Some(mergeSchemas({
				schemas: schemaList,
				resolvers: resolvers(schemas),
			})) : Some(schemaList[0]).
				map(schema => typeof schema === "string" ? makeExecutableSchema({typeDefs: schema}) : schema)).
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