import { trainAModel } from "../../server/tensorTest";

describe("trainAModel", function () {
	this.timeout(60000)

	it("should train model", async () => {
		const model = await trainAModel()
	})
})