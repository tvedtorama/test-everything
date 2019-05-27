import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
import { TypedInputFieldConfigMap } from "../uilts/TypedFieldConfigMap";
import { IHouse } from "../uilts/setupGraphQL";

interface IMangleArgs {
	hello: string
}

export function createSchema() {
	const schema = new GraphQLSchema({
		query: new GraphQLObjectType<{house: IHouse}, {hable: () => null}>({
			name: "Blabbo",
			fields: () => ({
				houseMangle: {
					args: <TypedInputFieldConfigMap<IMangleArgs>>{
						hello: {type: GraphQLString}
					},
					type: GraphQLString,
					resolve: ({house}, args: IMangleArgs) => `Owner: ${house.owner} hello: ${args.hello}`
				},
			})
		})
	})

	return schema
}
