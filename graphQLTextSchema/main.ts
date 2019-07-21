import { setupGraphQL } from "../utils/setupGraphQL";

export default () => {
	setupGraphQL({main: `type House {
			address: String
			owner: String
		}
		type Query {
			house: House
		}
		schema {
			query: Query
		}
	`})
}