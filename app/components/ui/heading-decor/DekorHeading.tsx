import { url } from 'inspector'
import { FC } from 'react'
import cn from 'classnames'
import s from './DekorHeading.module.scss'
import decor from './decorr.svg'
interface IDecorHeading {
	text: string
	className?: string
}
export const DekorHeading: FC<IDecorHeading> = ({ text, className }) => {
	return <div style={{backgroundImage: `url(${decor})`}} className={cn(s.decor, className)}>{text}</div>
}
