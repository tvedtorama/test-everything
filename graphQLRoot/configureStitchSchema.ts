import { makeRemoteExecutableSchema, introspectSchema, Operation } from 'graphql-tools';
import {default as Axios} from 'axios'
import { print, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import { FetcherOperation } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import { Maybe } from 'monet'

/// Loads data for MRES - both when building schema (introspec.) and when executing queries.
const fetcher = async ({ query: queryDocument, variables, operationName, context }: FetcherOperation) => {
	const realClientOperationName = Maybe.Some(queryDocument).
		flatMap(doc => Maybe.fromUndefined(doc.definitions[0])).
		map((def: OperationDefinitionNode) => def.name.value)
	.orSome("N/A")

	if (realClientOperationName !== "N/A")
		console.log(`Fetching with clientOperationName: ${realClientOperationName}`)

	const query = print(queryDocument);
	const fetchResult = await Axios.post('http://127.0.0.1:2223/publicgraphql',
		{
			query,
			variables,
			operationName,
		},
		{
			headers: {
				'Athentication': 'Bearer SECRET',
			},
		});
	return fetchResult.data;
}

export const configureStitchSchema = async (): Promise<GraphQLSchema> => {
	const schema = makeRemoteExecutableSchema({
		schema: await introspectSchema(fetcher),
		fetcher,
	});
	return schema
}