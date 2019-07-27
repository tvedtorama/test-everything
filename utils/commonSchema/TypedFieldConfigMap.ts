import { GraphQLFieldConfig, GraphQLArgumentConfig, GraphQLInputField, GraphQLInputFieldConfig } from "graphql";

// Tip: See the following for an example on how to use the Typescript compiler to generate graphQL schema:
// https://levelup.gitconnected.com/writing-a-custom-typescript-ast-transformer-731e2b0b66e6

export type TypedFieldConfigMap<T, TContext = any, S = T> = {
	[P in keyof T]: GraphQLFieldConfig<S, TContext>
}

export type TypedArgConfigMap<T> = {
	[P in keyof T]: GraphQLArgumentConfig
}

export type TypedInputFieldConfigMap<T, TContext = any> = {
	[P in keyof T]: GraphQLInputFieldConfig
}
