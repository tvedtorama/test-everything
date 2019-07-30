import * as React from 'react'
import { ScatterChart, XAxis, YAxis, CartesianGrid, Scatter, Cell } from 'recharts';
import { IIrisLabelSet, IPredictOutputRow } from '../../../server/tensorTest';

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeCategory10).range();
const labels: IIrisLabelSet[] = ["setosa", "versicolor", "virginica"]

export const Plot = (props: { predictResult: IPredictOutputRow[] }) => {
	return (<ScatterChart width={1024} height={500}>
		<XAxis dataKey="vx2" />
		<YAxis dataKey="vx1" />
		<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
		<Scatter name="Predict Result" data={props.predictResult} fill="#8884d8">
			{
				props.predictResult.map((entry, index) =>
					<Cell key={`cell-${index}`} fill={colors[labels.indexOf(entry.inputLabel as IIrisLabelSet)]} />)
			}
		</Scatter>
	</ScatterChart>)
}