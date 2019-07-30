import * as React from 'react'
import {TrainDataGrid} from './TrainDataGrid'
import { useState } from 'react';
import { IIris, IPredictOutputRow } from '../../server/tensorTest';
import { TrainAndPredict } from './TrainAndPredict';
import { Plot } from './results/Plot';


export const Main = (props: { store: any }) => {
	const [irisData, setIrisData] = useState<IIris[]>([])
	const [predictData, setPredictData] = useState<IPredictOutputRow[]>([])

	return (<div className="coolness">
		<TrainDataGrid {...{irisData, setIrisData}}/>
		<TrainAndPredict {...{irisData, setPredictData}} />
		{
			predictData.length && <Plot predictResult={predictData} /> || null
		}
	</div>)
}
