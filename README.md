# test-everything
Test some cool technologies

## TODOs

* GraphQL Subscriptions (with SSE protocol?)

## Run Coverage With C8

~~tsc --skipLibCheck && c8 --exclude build/tests mocha build/tests/**/*.js~~

``npm run test-with-coverage``

The resulting report is saved in `./coverage` (.gitignore)

## Curl the correlation service

```
curl -X POST http://127.0.0.1:3010/service --data '{"greeting":"Rabalderpuddding"}' --header "Content-Type: application/json" --header "x-correlation-id: yawadubla" -w "\n"
```

## GraphQL Enabled Tensorflow Autoencoder

Train using this mutation:

```graphql
mutation($input: TrainMutationInput!) {
  trainMutation(input: $input) {
    ok
    clientMutationId
  }
}
```

`input` being a variable defined like this:

```
{
  "input": {
    "data": [{"sepalLength": 5.1 ...
```

Predict using this query, `$rows` simply the Iris data to run.

```graphql
query($rows: [PredictInput]) {
  pip
  predict(params: $rows) {
    vx1
    vx2
    inputLabel
  }
}
```


## Do the graphql stitching


Start plugin:
```
tsc && serverApp=graphQLPlugin port=2223 node index
```

Start core:
```
tsc && serverApp=graphQLRoot port=2222 node index
```