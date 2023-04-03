import decor from './decorr.svg'
import cn from 'classnames'
import { url } from 'inspector'
import { FC } from 'react'

import s from './DekorHeading.module.scss'

interface IDecorHeading {
	text: string
	className?: string
}
export const DekorHeading: FC<IDecorHeading> = ({ text, className }) => {
	return <div className={cn(s.decor, className)}>{text}</div>
}
