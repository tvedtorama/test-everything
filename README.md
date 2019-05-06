# test-everything
Test some cool technologies

## TODOs

* GraphQL Subscriptions (with SSE protocol?)
* GraphQL stitching between two independant services

## Run Coverage With C8

tsc --skipLibCheck && c8 --exclude build/tests mocha build/tests/**/*.js


## Curl the correlation service

```
curl -X POST http://127.0.0.1:3010/service --data '{"greeting":"Rabalderpuddding"}' --header "Content-Type: application/json" --header "x-correlation-id: yawadubla" -w "\n"
```
