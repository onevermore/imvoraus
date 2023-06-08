import cn from 'classnames'
import { Dispatch, FC, SetStateAction, memo, useState } from 'react'
import ReactTooltip from 'react-tooltip'

import { deletePunct } from '@/utils/string/deletePunct'

import s from './Tooltip.module.scss'

interface ITooltipProps {
	text: string
	onClick: (e: any) => void
}

const Text: FC<ITooltipProps> = ({ text, onClick }) => {
	const [isOver, setIsOver] = useState<number | null>(null)
	console.count('Text render')

	const handleMouseOver = (i: number, val: string) => {
		setIsOver(i)
		//onHover(val)
	}

	const handleClick = (val: string) => {
		//	console.log('click on word = ', val)
		onClick(val)
	}
	return (
		<div>
			{text.split(' ').map((value, i) => (
				<span
					key={i}
					data-tooltip-id="foo"
					data-tooltip-content={deletePunct(value)}
					data-tooltip-variant="error"
				>
					<span
						className={cn({
							[s.active]: isOver === i,
						})}
						data-tip={deletePunct(value)}
						data-event="click focus"
						data-for="foo"
						data-event-off="onMouseOut"
						onClick={() => handleClick(deletePunct(value))}
						onMouseOver={() => handleMouseOver(i, deletePunct(value))}
						onMouseOut={() => {
							setIsOver(null)
							//ReactTooltip.hide()
						}}
					>
						{value}
					</span>{' '}
				</span>
			))}
		</div>
	)
}

//Text.displayName = 'Text'
export default Text
