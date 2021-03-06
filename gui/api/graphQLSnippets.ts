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

export const predict = `
query($rows: [PredictInput]!, $trainId: String!) {
	predict(rows: $rows, trainId: $trainId) {
	  vx1
	  vx2
	  inputLabel
	}
  }`

export const train = `
mutation($input: TrainMutationInput!) {
	trainMutation(input: $input) {
	  ok
	  clientMutationId
	}
  }`