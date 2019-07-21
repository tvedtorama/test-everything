import * as tf from '@tensorflow/tfjs-node'
import * as irisData from '../data/iris.json'
import { Iterable } from '@reactivex/ix-es5-cjs'
import { groupBy, flatMap, scan, scanRight } from '@reactivex/ix-es5-cjs/iterable/pipe/index';
import { Maybe, Some } from 'monet';
import { fromPairs } from '../utils/object';

// Inspired by:
//  https://towardsdatascience.com/pca-vs-autoencoders-1ba08362f450

// This vaguely suggests how to extract a layers from a trained model, how to get output from hidden layer:
// https://stackoverflow.com/a/51600840/2684980

// This tells how to set up models in tf.js:
//   https://codelabs.developers.google.com/codelabs/tfjs-training-regression/index.html#5

type IIris = typeof irisData[0]

const smap = {
	"setosa": [0, 0, 1],
	"versicolor": [0, 1, 0],
	"virginica": [1, 0, 0],
}

const buildHiddenLayerModel = (model: tf.Sequential) => {
	const [hidden, ...outputsAndOthers] = model.layers
	return tf.model({
		inputs: hidden.input,
		outputs: hidden.output}); // new model from layers
}

const inputVector = (y: IIris) => [
	y.petalLength,
	y.petalWidth,
	y.sepalLength,
	y.sepalWidth] as const

const trainingCut = 1.0

type IIrisWithVector = IIris & {
	label: (typeof smap)["setosa"],
	isTraining: boolean,
	tensorVect: number[]
}

type IMinMax = {[index: number]: [number, number]}
type IIrisWithMinMax = IIrisWithVector & {minMax: IMinMax}

const minMaxList = (val: number, minMax: IMinMax, idx: number, isMax: boolean) =>
[
	val,
	Maybe.fromUndefined(minMax[idx]).
			map(x => x[isMax ? 1 : 0]).
			orSome(undefined)
].filter(x => typeof x !== "undefined")

const minMax = (val: number, minMax: IMinMax, idx: number) =>
	[
		Math.min(...minMaxList(val, minMax, idx, false)),
		Math.max(...minMaxList(val, minMax, idx, true))
	] as const


const scaleVector = (vect: number[], minMax: IMinMax) =>
	vect.map((x, i) => (vect[i] - minMax[i][0]) / (minMax[i][1] - minMax[i][0]))

/** Merges data and label as one-hot, cuts a training set (ATW: all),
 * and normalizes all values between [0, 1].  The minMax normalizer
 * vector is returned on every entry.
*/
export const prepareNormalizedData = () => Some(Iterable.
	from(irisData).pipe(
		groupBy((x: IIris) => x.species),
		flatMap(x =>
			x.map(y => ({
				label: smap[x.key],
				isTraining: Math.random() <= trainingCut ? true : false,
				...y,
			})).map(y => (<IIrisWithVector>{
				...y,
				tensorVect: [
					...inputVector(y),
					...y.label,
				]
			}))),
		scan<IIrisWithVector, IIrisWithMinMax>((x, y) => (<IIrisWithMinMax>{
			...y,
			minMax: fromPairs(y.tensorVect.map((zz, i) => [i, minMax(zz, x.minMax, i)]))
		}), <IIrisWithMinMax>{minMax: {}}),
		scanRight<IIrisWithMinMax, IIrisWithMinMax>((x, y) =>
			Some(x.minMax || y.minMax).
				map(minMax => ({
					...y,
					minMax,
					tensorVect: scaleVector(y.tensorVect, minMax)
				})).some(), <IIrisWithMinMax>{})
	)).map(irisDoer =>
		irisDoer.partition(x => x.isTraining)
	).map(([trainingSetIter, evalSetIter]) => ({
		trainingSet: [...trainingSetIter],
		evalSet: [...evalSetIter],
	})).some()

const hiddenLayerWidth = 2

const setupModel = (inputShapeWidth: number) => {
	const model = tf.sequential();
	model.add(tf.layers.dense({ units: hiddenLayerWidth, inputShape: [inputShapeWidth] }));
	model.add(tf.layers.dense({ units: inputShapeWidth, inputShape: [hiddenLayerWidth] }));

	model.compile({
		optimizer: tf.train.adam(),
		loss: tf.losses.meanSquaredError,
		metrics: ['mse'],
	});

	return model
}

export const buildAndTrainModels = (trainingSet: IIrisWithVector[]) => Some({
	getTrainVector: (idx: number) => trainingSet[idx].tensorVect,
}).map(({getTrainVector}) => ({
	getTrainVector,
	inputShapeWidth: getTrainVector(0).length,
})).map(({getTrainVector, inputShapeWidth}) => ({
	getTrainVector,
	inputShapeWidth,
	createInputTensor: (idx: number) => tf.tensor2d(getTrainVector(idx), [1, inputShapeWidth]),
	input_X: tf.tensor2d(trainingSet.map(x => x.tensorVect), [trainingSet.length, inputShapeWidth]),
	model: setupModel(inputShapeWidth),
})).map(async ({model, input_X, createInputTensor}) => {
	const batchSize = 16;
	const epochs = 600;

	await model.fit(input_X, input_X, {
		batchSize,
		epochs,
		shuffle: true,
		validationSplit: 0.1,
		callbacks: {
			// onEpochEnd: (...x) => console.log("epoch end", x)
		}
	})

	return {
		model,
		hiddenModel: buildHiddenLayerModel(model),
		createInputTensor,
	}
}).some()


export const trainAModel = async () => {

	// Needs to plot this
	// Should *not* include the labels in the training data, that would not make sense when new data arrives.

	const {trainingSet} = prepareNormalizedData()

	const {createInputTensor, model, hiddenModel} = await buildAndTrainModels(trainingSet)

	const prediction = model.predict(createInputTensor(0))
	if ("length" in prediction) {
		console.log("unexpected list of results")
	} else {
		prediction.print()
	}

	const estimates = Iterable.from([hiddenModel]).
		pipe(
			flatMap(hm => Iterable.range(0, trainingSet.length).
							map(idx => hm.predict(createInputTensor(idx))).
							map((tensor: tf.Tensor<tf.Rank>) => tensor) // .
// 							map(tensor => tensor.arraySync()).
// 							map()
		))


	for (const z of estimates)
		z.print()
}
