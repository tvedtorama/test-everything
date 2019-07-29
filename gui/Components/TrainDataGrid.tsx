import * as React from 'react'
import {Section, Button} from '../styles'
import * as ReactDataGrid from 'react-data-grid'
import {Column} from 'react-data-grid'
import { IIris } from '../../server/tensorTest';
import { useState } from 'react';
import {api} from '../api'

const css = require('../styles/crapGrid.css')

const numColWidth = 120
const textColWidth = 240
const numColProps: Partial<Column<any>> = {
	width: numColWidth,
	resizable: true,
	cellClass: "abdul-ibrahim",
}

const columns: (Column<any> & {key: keyof IIris | "index"})[] = [{
	key: "index",
	name: "Index",
	width: 120,
}, {
	...numColProps,
	key: "petalLength",
	name: "Petal Length",
}, {
	...numColProps,
	key: "petalWidth",
	name: "Petal Width",
}, {
	...numColProps,
	key: "sepalLength",
	name: "Sepal Length",
}, {
	...numColProps,
	key: "sepalWidth",
	name: "Sepal Width",
}, {
	key: "species",
	name: "Species",
	width: textColWidth,
}]

export const TrainDataGrid = (props) => {
	const [irisData, setIrisData] = useState<IIris[]>([])

	return (<Section>
			<ReactDataGrid minWidth={1000}
				columns={columns}
				rowGetter={(index) => ({...irisData[index], index})}
				rowsCount={irisData.length} />

			<Button primary style={{width: "15em"}} onClick={() => {
					api.loadIrisData().then(data => setIrisData(data))
				}}>
				Load Iris Data
			</Button>
		</Section>)

}
