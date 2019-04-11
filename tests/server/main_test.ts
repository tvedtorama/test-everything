import * as chai from 'chai'

chai.should()

describe("main", () => {
	it("should do something", async () => {
		const x = await new Promise(acc => {
			setTimeout(() => acc(15), 120)
		})

		x.should.equal(15)
	})
})