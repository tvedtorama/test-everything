import styled from '@emotion/styled'

export const Section = styled('div')({
	width: "100%",
	margin: "5em",
	display: "flex",
	flexDirection: "column",
})


export const Button = styled.button`
	color: white;
	background: ${(props: any) => props.primary ? "blue" : "orange"};
	margin: 0.1em;
	width: 15em;
`
