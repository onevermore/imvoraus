import Crossword, {
	CrosswordImperative,
	ThemeProvider,
} from '@jaredreisinger/react-crossword'
import { useRef } from 'react'

import { ICrossData } from '../../../../../pages/courses/[slug]/crossword/[crossId]'
import { Button } from '../../form-elements/Button'
import { Heading } from '../../heading/Heading'

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
export interface IMyCros {
	crossData: ICrossData
	onCrosswordCorrect: () => void
	title: string
	description: string
}

export const MyCrossword = ({
	crossData,
	onCrosswordCorrect,
	title,
	description,
}: IMyCros) => {
	const cross = useRef<CrosswordImperative>(null)

	const onReset = () => {
		if (cross.current) {
			cross.current.reset()
		}
	}

	return (
		<>
			<h1>{/*My Text number <b>{textId}</b> for Course: <b>{slug}</b>*/}</h1>
			<Heading title={title} />
			<div className="my-5">{description}</div>
			<div className="sm:w-[40%] ml-[20%]">
				<ThemeProvider theme={themeContext}>
					<Crossword
						ref={cross}
						data={crossData}
						onCrosswordCorrect={onCrosswordCorrect}
					/>
				</ThemeProvider>
				<Button colored onClick={onReset}>
					Reset
				</Button>
			</div>
		</>
	)
}
