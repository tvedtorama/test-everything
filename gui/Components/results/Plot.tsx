import * as React from 'react'
import { ScatterChart, XAxis, YAxis, CartesianGrid, Scatter, Cell, Tooltip } from 'recharts';
import { IIrisLabelSet, IPredictOutputRow } from '../../../server/tensorTest';

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeCategory10).range();
const labels: IIrisLabelSet[] = ["setosa", "versicolor", "virginica"]

const CustomTooltip = ({payload}: {payload?: any[]}) => {
	if (payload && payload.length > 0) {
		return <ul>
			<li>vx1: {payload[0].payload.vx1}</li>
			<li>vx2: {payload[0].payload.vx2}</li>
			<li>label: {payload[0].payload.inputLabel}</li>
		</ul>
	}
	return null
}

export const Plot = (props: { predictResult: IPredictOutputRow[] }) => {
	return (<ScatterChart width={1024} height={500}>
		<XAxis dataKey="vx1" />
		<YAxis dataKey="vx2" />
		<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
		<Tooltip content={<CustomTooltip />} />
		<Scatter name="Predict Result" data={props.predictResult} fill="#8884d8">
			{
				props.predictResult.map((entry, index) =>
					<Cell key={`cell-${index}`} fill={colors[labels.indexOf(entry.inputLabel as IIrisLabelSet)]} />)
			}
		</Scatter>
	</ScatterChart>)
}