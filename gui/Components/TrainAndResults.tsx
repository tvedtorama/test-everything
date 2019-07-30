import * as React from 'react'
import {Section, Button} from '../styles'
import { IIris } from '../../server/tensorTest';
import { api } from '../api';
import { useState } from 'react';
const nanoId: () => string = require('nanoid')

interface IProps {
	irisData: IIris[]
}

export const TrainAndResults = (props: IProps) => {
	const [trainId, setTrainId] = useState(nanoId())
	const [state, setState] = useState<"TRAIN" | "TRAINING" | "PREDICT" | "PREDICTING">("TRAIN")

	const trainProcess = async () => {
		setState("TRAINING")
		try {
			const result = await api.train(trainId, props.irisData)
			if (result) {
				setState("PREDICT")
			} else {
				throw new Error("Uxepected issue")
			}
		} catch {
			setState("TRAIN")
		}
	}

	return (<Section>
		{
			state.startsWith("TRAIN") ?
				<Button disabled={state === "TRAINING"} onClick={trainProcess}>Train</Button> :
				<Button disabled={state === "PREDICTING"} onClick={async () => {
					setState("PREDICTING")
					try {
						const result = await api.predict(trainId, props.irisData)
					} finally {
						setState("PREDICT")
					}
				}}>Predict</Button>
		}
	</Section>)
}