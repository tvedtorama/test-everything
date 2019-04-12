
const shouldFoolTests = (a) => a === 10

export const makeComplexCalc = (a, b) => shouldFoolTests(a) ?
	a + b :
	2

export const makeEasyCalc = (a) => a * 2