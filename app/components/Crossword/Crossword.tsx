import Crossword from '@jaredreisinger/react-crossword'
import { ThemeProvider } from '@jaredreisinger/react-crossword'
import { FC } from 'react'

import { Heading } from '../ui/heading/Heading'

const data = {
	across: {
		1: {
			clue: 'Man nimmt das mit wenn es regnet',
			answer: 'REGENSCHIRM',
			row: 0,
			col: 0,
		},
		4: {
			clue: 'Das ist etwas dass man lesen kann',
			answer: 'BUCH',
			row: 5,
			col: 1,
		},
		5: {
			clue: 'Mochten Sie einen ... oder einen Kaffee trinken?',
			answer: 'TEE',
			row: 10,
			col: 2,
		},
		7: {
			clue: 'Der Tag nach Freitag',
			answer: 'SAMSTAG',
			row: 8,
			col: 0,
		},
	},
	down: {
		2: {
			clue: "Wie sagt man 'salam' auf Deutsch? ",
			answer: 'HALLO',
			row: 0,
			col: 7,
		},
		3: {
			clue: 'Wo kann man Geld entnehmen?',
			answer: 'GELDAUTOMAT',
			row: 0,
			col: 2,
		},
	},
}

export const Crosswordd: FC = () => {
	const onAllCorrect = () => {
		confirm('good job!')
	}

	const themeContext = {
		columnBreakpoint: '500px',
		cellBackground: '#504d4dff',
		cellBorder: 'rgb(0,255,255)',
		textColor: 'rgb(255,255,255)',
		numberColor: 'rgba(255,255,255, 1)',
		focusBackground: 'rgb(0,155,255)',
		highlightBackground: '#c79bbe',
		gridBackground: 'transparent',
	}

	return (
		<div className="sm:w-[40%] ml-[20%]">
			<Heading title="kreuzwortratsel" />
			<ThemeProvider theme={themeContext}>
				<Crossword data={data} onCrosswordCorrect={onAllCorrect} />
			</ThemeProvider>
		</div>
	)
}
