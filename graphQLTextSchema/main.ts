import { setupGraphQL } from "../uilts/setupGraphQL";

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