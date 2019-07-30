import { IIris, IPredictOutputRow } from "../../server/tensorTest";
import {default as Axios} from 'axios'
import * as Snippets from './graphQLSnippets'


export interface IApi {
	loadIrisData: () => Promise<IIris[]>
	train: (trainId: string, irisData: IIris[]) => Promise<boolean>
	predict: (trainId: string, irisData: IIris[]) => Promise<IPredictOutputRow[]>
}

const url = '/publicgraphql'

export const api: IApi = {
	loadIrisData: async () => {
		const result = await Axios.post(url, {
			query: Snippets.irisData,
			variables: {}
		})
		return result.data.data.irisData
	},
	predict: async (trainId, irisData) => {
		const result = await Axios.post(url, {
			query: Snippets.predict,
			variables: {
				trainId,
				rows: irisData
			}
		})
		return result.data.data.predict
	},
	train: async (trainId, irisData) => {
		const result = await Axios.post(url, {
			query: Snippets.train,
			variables: {
				input: {
					trainId,
					rows: irisData // .map(x => omit(x, ["species"]))
				}
			}
		})
		return result.data.data.trainMutation.ok
	}
}