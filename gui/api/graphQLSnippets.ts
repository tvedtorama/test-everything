export const irisData = `
query {
	irisData {
	  petalLength
	  petalWidth
	  sepalLength
	  sepalWidth
	  species
	}
}`

export const train = `
mutation($input: TrainMutationInput!) {
	trainMutation(input: $input) {
	  ok
	  clientMutationId
	}
  }

`