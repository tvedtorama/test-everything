import * as chai from 'chai'
import { makeComplexCalc } from '../../server/targetForTest';

chai.should()

describe("targetForTests", () => {
	it("should do something", async () => {
		const result = makeComplexCalc(10, 20)

		result.should.equal(30)
	})
})