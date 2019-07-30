import * as React from 'react'
import {Section, Button} from '../styles'
import { IIris } from '../../server/tensorTest';
import { api } from '../api';
import { useState } from 'react';

interface IProps {
	irisData: IIris[]
}

export const TrainAndResults = (props: IProps) => {
	const [state, setState] = useState<"TRAIN" | "TRAINING" | "PREDICT" | "PREDICTING">("TRAIN")

	const trainProcess = async () => {
		setState("TRAINING")
		try {
			const result = await api.train(props.irisData)
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
					const result = await api.predict(props.irisData)
					if (result) {
						setState("PREDICT")
					}
				}}>Predict</Button>
		}
	</Section>)
}