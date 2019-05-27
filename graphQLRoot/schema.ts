import { GraphQLSchema, GraphQLObjectType, GraphQLFloat, GraphQLString } from "graphql";

const house = new GraphQLObjectType({
	name: "House",
	fields: () => ({
		owner: {type: GraphQLString},
		address: {type: GraphQLString}
	})
})

export function createSchema() {
	const schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: "HelloObject",
			fields: () => ({
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