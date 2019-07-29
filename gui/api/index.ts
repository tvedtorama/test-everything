import { IIris } from "../../server/tensorTest";
import {default as Axios} from 'axios'
import * as Snippets from './graphQLSnippets'

export interface IApi {
	loadIrisData: () => Promise<IIris[]>
}

const url = '/publicgraphql'

export const api: IApi = {
	loadIrisData: async () => {
		const result = await Axios.post(url, {
			query: Snippets.irisData,
			variables: {}
		})
		return result.data.data.irisData
	}
}