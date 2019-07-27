import { GraphQLSchema, GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList, GraphQLInputObjectType } from "graphql";
import { mutationWithClientMutationId } from "../utils/commonSchema/mutationWithClientMutationId";
import { TypedFieldConfigMap, TypedInputFieldConfigMap } from "../utils/commonSchema/TypedFieldConfigMap";
import { IIris, IPredictOutputRow } from "../server/tensorTest";
import { Some } from "monet";

const predictInputFields = <TypedInputFieldConfigMap<IIris>>{
	petalLength: {type: new GraphQLNonNull(GraphQLFloat)},
	petalWidth: {type: new GraphQLNonNull(GraphQLFloat)},
	sepalLength: {type: new GraphQLNonNull(GraphQLFloat)},
	sepalWidth: {type: new GraphQLNonNull(GraphQLFloat)},
	species: {type: GraphQLString},
}

const predictInput = new GraphQLInputObjectType({
	name: "PredictInput",
	fields: () => predictInputFields,
})

const predictOutput = new GraphQLObjectType({
	name: "Prediction",
	fields: () => (<TypedFieldConfigMap<IPredictOutputRow>>{
		vx1: {
			type: GraphQLFloat,
		},
		vx2: {
			type: GraphQLFloat,
		},
		inputLabel: {
			type: GraphQLString,
		}
	})
})

const predictSchema = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		pip: {
			type: GraphQLString, // This field, under `Query` will resolve using the rootValue
		},
		predict: {
			args: {
				params: {type: new GraphQLList(predictInput)}
			},
			type: new GraphQLList(predictOutput),
			// arguments, resolve
		}
	})
})

const trainMutation = mutationWithClientMutationId({
	name: "TrainMutation",
	inputFields: () => ({
		data: {type: new GraphQLList(predictInput)}
	}),
	outputFields: () => ({
		ok: {type: GraphQLBoolean}
	}),
	mutateAndGetPayload: async (args, _2, {rootValue}) => Some(await rootValue.train(args)).
		map(result => ({
			ok: result,
		})).some(),
})

export function createSchema() {
	const schema = new GraphQLSchema({
		query: predictSchema,
		mutation: new GraphQLObjectType({
			name: "Mutations",
			fields: () => ({
				trainMutation,
			})
		})
	})

	return schema
}
