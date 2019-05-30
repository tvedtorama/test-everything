import { GraphQLSchema, GraphQLObjectType, GraphQLFloat, GraphQLString } from "graphql";
import { TypedFieldConfigMap } from "../uilts/TypedFieldConfigMap";


export type IHouse = {
	owner: string
	address: string
}

const house = new GraphQLObjectType({
	name: "House",
	fields: () => (<TypedFieldConfigMap<IHouse>>{
		owner: {type: GraphQLString},
		address: {type: GraphQLString}
	})
})

export type ISchemaBasics = {
	house: IHouse
	a: any
}

export function createSchema() {
	const schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: "HelloQuery",
			fields: () => (<TypedFieldConfigMap<ISchemaBasics>>{
				house: {
					type: house,
				},
				a: {
					type: GraphQLFloat,
					resolve: (_1, _2, _3, {rootValue}) => rootValue.getNumber()
				}
			})
		})
	})

	return schema
}