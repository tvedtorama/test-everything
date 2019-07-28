import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Main } from './components/Main';

export const render = (store, Component: React.StatelessComponent<{store: any}>) => {
	ReactDOM.render(
		<Component store={store}/>,
		document.getElementById('top'))
}

render(null, Main)

if (module.hot) {
	module.hot.accept('./components/Main', () => {
		const NextApp = require("./components/Main").Main;
		render(null, NextApp)
	})
	// module.hot.accept() This could also work, but not as well...
}
