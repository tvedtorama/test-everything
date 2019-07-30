import { IIris } from "../../server/tensorTest";
import {default as Axios} from 'axios'
import * as Snippets from './graphQLSnippets'
import { omit } from "../../utils/object";

export interface IApi {
	loadIrisData: () => Promise<IIris[]>
	train: (irisData: IIris[]) => Promise<boolean>
	predict: (irisData: IIris[]) => Promise<{vx1: number}[]>
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
	predict: async (irisData) => {
		const result = await Axios.post(url, {
			query: Snippets.predict,
			variables: {
				rows: irisData
			}
		})
		return result.data.data.predict
	},
	train: async (irisData) => {
		const result = await Axios.post(url, {
			query: Snippets.train,
			variables: {
				input: {
					data: irisData // .map(x => omit(x, ["species"]))
				}
			}
		})
		return result.data.data.trainMutation.ok
	}
}