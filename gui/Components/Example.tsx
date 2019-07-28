import * as React from 'react';
import { useState } from 'react'

/** Included to test the react hot reloading thing */
export const Example = (props) => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}