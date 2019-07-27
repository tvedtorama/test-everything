import { setupGraphQL } from "../utils/setupGraphQL";
import { createSchema } from "./createSchema";
import { IIris, autoEncoderService, IAutoEncoderPredictService } from "../server/tensorTest";
import { Some } from "monet";

// Node: Should make a dictionary of these, so the user could train different models
export const tranPredictStateMachine = function*(): IterableIterator<{predict: (a: IIris[]) => any, train: (a: IIris[]) => any}> {
	let predicter: IAutoEncoderPredictService = null
	while (!predicter)
		try {
			yield {
				predict: () => {throw new Error("Train first")},
				train: async (irisData: IIris[]) => {
					Some(await autoEncoderService(irisData)).
						forEach(predictService =>
							predicter = predictService)
					return true
				}
			}
		} catch (err) {
			console.error("There is an issue", err)
		}

	while (true) {
		yield {
			...predicter,
			train: () => {throw new Error("Already trained")},
		}
	}
}

export default () => {
	const gen = tranPredictStateMachine()
	setupGraphQL({main: createSchema()}, undefined, {
		pip: async () => "papp",
		predict: ({params}: {params: IIris[]}) => Some(gen.next().value).
			map(service =>
				service.predict(params)).some(),
		train: async ({data}) => Some(gen.next().value).
			map(service =>
				service.train(data)).some()
	})
}
