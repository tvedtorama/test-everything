import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Main } from './Components/Main';

export const render = (store, Component: React.StatelessComponent<{store: any}>) => {
	ReactDOM.render(
		<Component store={store}/>,
		document.getElementById('top'))
}


render(null, Main)