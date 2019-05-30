import { createSchema, IHouse } from './schema';
import { setupGraphQL, resolveSchemas } from '../uilts/setupGraphQL';
import { loadStitchSchema } from './loadStitchSchema';
import { DocumentNode, GraphQLSchema } from 'graphql';
import { IResolverOptions, IResolversParameter } from 'graphql-tools';

type MySchemaSetupPromise<T> = {
	main: T
	extensions: T
	babboSchema: T
}

type MySchemaSetup = {[P in keyof MySchemaSetupPromise<any>]?: GraphQLSchema | DocumentNode}

export default async () => {
	const schemas = await resolveSchemas(<MySchemaSetupPromise<GraphQLSchema | Promise<GraphQLSchema> | string>>{
		main: createSchema(),
		extensions: `
			extend type House {
				mangle: BlabboResult
			}`,
		babboSchema: loadStitchSchema(),
	})

	setupGraphQL(schemas, (schemas: MySchemaSetup) => (<IResolversParameter>{
		House: {
			mangle: <IResolverOptions<IHouse>>{
				fragment: `... on House { address }`, // This clevernes assures that `address` is selected/loaded on `house` in the `source` - even if the client did not
				resolve(house, _1, context, info) {
					return info.mergeInfo.delegateToSchema({
						schema: schemas.babboSchema instanceof GraphQLSchema ? schemas.babboSchema : null,
						operation: 'query',
						fieldName: 'houseMangle',
						args: {
							hello: house.address,
						},
						context,
						info,
					});
				},
			}
		}
	}))
}
