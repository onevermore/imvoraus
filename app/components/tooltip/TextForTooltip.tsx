import { FC, forwardRef, useEffect, useRef, useState } from 'react'
import ReactTooltip from 'react-tooltip'

import { deletePunct } from '@/utils/string/deletePunct'

import s from './Tooltip.module.scss'

interface ITooltipProps {
	text: string
}

export const TextForTooltip: FC<ITooltipProps> = ({ text }) => {
	return (
		<div>
			{text.split(' ').map((value, i) => (
				<span key={i}>
					<span
						data-tip={deletePunct(value)}
						data-event="click focus"
						data-for="foo"
						data-event-off="onMouseOut"
						onMouseOut={() => {
							console.log('hey')
							ReactTooltip.hide()
						}}
					>
						{value}
					</span>{' '}
				</span>
			))}
		</div>
	)
}
