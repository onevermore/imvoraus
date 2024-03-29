import Crossword, {
	CrosswordImperative,
	ThemeProvider,
} from '@jaredreisinger/react-crossword'
import { useEffect, useRef } from 'react'

import { ICrossDataCommon } from '@/shared/types/crossword.types'

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
	crossData: ICrossDataCommon
	onCrosswordCorrect?: () => void
	title: string
	description: string
	filled?: boolean
}

export const MyCrossword = ({
	crossData,
	onCrosswordCorrect,
	title,
	description,
	filled,
}: IMyCros) => {
	const cross = useRef<CrosswordImperative>(null)

	useEffect(() => {
		if (filled) cross?.current?.fillAllAnswers()
		//	if (!filled) cross?.current?.reset()
	}, [crossData])

	const onReset = () => {
		if (cross.current) {
			cross.current.reset()
		}
	}
	//	console.log('.... ', crossData)
	return (
		<>
			<h1>{/*My Text number <b>{textId}</b> for Course: <b>{slug}</b>*/}</h1>
			<Heading title={title} />
			<div className="my-5">{description}</div>
			<div className="w-[40%] ml-0 xl:ml-[20%]">
				<ThemeProvider theme={themeContext}>
					<Crossword
						ref={cross}
						data={crossData}
						onCrosswordCorrect={onCrosswordCorrect}
					/>
				</ThemeProvider>
				{!filled && (
					<Button colored onClick={onReset}>
						Reset
					</Button>
				)}
			</div>
		</>
	)
}
