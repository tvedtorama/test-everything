import * as React from 'react'
import {Section, Button} from '../styles'
import { IIris } from '../../server/tensorTest';
import { api } from '../api';

interface IProps {
	irisData: IIris[]
}

export const TrainAndResults = (props: IProps) => {
	return (<Section>
		<Button onClick={async () => {
			const result = await api.train(props.irisData)
			console.log(result) // Just returns true, if most is OK.
		}}>Train</Button>
	</Section>)
}