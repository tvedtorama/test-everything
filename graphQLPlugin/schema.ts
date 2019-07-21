import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";
import { TypedInputFieldConfigMap, TypedFieldConfigMap } from "../utils/TypedFieldConfigMap";
import { IHouse } from "../utils/setupGraphQL";

interface IMangleArgs {
	hello: string
}

interface IBlabboResult {
	text: string
	num: number
}

/** Result of Blabbo, this schema is referenced in the stitching after downloading the schema */
const blabboResultSchema = new GraphQLObjectType({
	name: "BlabboResult",
	fields: () => <TypedFieldConfigMap<IBlabboResult>>{
		text: {type: GraphQLString},
		num: {type: GraphQLFloat},
	}
})

const fieldConfig = {
	args: <TypedInputFieldConfigMap<IMangleArgs>>{
		hello: {type: GraphQLString}
	},
	type: blabboResultSchema,
	resolve: ({house}, args: IMangleArgs) => <IBlabboResult>{
		text: `Owner: ${house.owner} hello: ${args.hello}`,
		num: args.hello.length,
	}
}

const blabboSchema = new GraphQLObjectType<{house: IHouse}, {hable: () => null}>({
	name: "BlabboQuery",
	fields: () => ({
		houseMangle: fieldConfig,
		// addressLookup: fieldConfig,
	})
})

export function createSchema() {
	const schema = new GraphQLSchema({
		query: blabboSchema
	})

	return schema
}
