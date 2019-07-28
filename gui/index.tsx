import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Main } from './components/Main';
import { hot } from 'react-hot-loader/root'

export const render = (store, Component: React.StatelessComponent<{store: any}>) => {
	const Comp = hot(Component)
	ReactDOM.render(
		<Comp store={store} />,
		document.getElementById('top'))
}

render(null, Main)