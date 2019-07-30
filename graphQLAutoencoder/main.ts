import { setupGraphQL } from "../utils/setupGraphQL";
import { createSchema } from "./createSchema";
import { IIris, autoEncoderService, IAutoEncoderPredictService } from "../server/tensorTest";
import { Some, Maybe, Nothing } from "monet";
import * as irisData from '../data/iris.json'

type IStateMachineType = IterableIterator<{predict: (a: IIris[]) => any, train: (a: IIris[]) => any}>

// Note: This state machine is somewhat redundant in that there is now also a dictionary of trained instances.
export const trainPredictStateMachine = function*(): IStateMachineType {
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

let generators = new Map<string, IStateMachineType>()

const getOrAddGenerator = (trainId, allowCreate?: true) => Maybe.fromUndefined(generators.get(trainId)).
	catchMap(() => allowCreate ? Some(trainPredictStateMachine()).map(gen => (generators.set(trainId, gen), gen)) : Nothing()).
	catchMap(() => {throw new Error("trainId not found")})

export default (fn: (app) => void) => {
	setupGraphQL({main: createSchema()}, undefined, {
		irisData: async () => irisData,
		predict: ({rows, trainId}: {rows: IIris[], trainId: string}) => getOrAddGenerator(trainId).map(gen => gen.next().value).
			map(service =>
				service.predict(rows)).some(),
		train: async ({rows, trainId}) => getOrAddGenerator(trainId, true).map(gen => gen.next().value).
			map(service =>
				service.train(rows)).some()
	}, fn)
}
