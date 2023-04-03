import { IButton } from './form.interface'
import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import s from './form.module.scss'

export const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	size = 'small',
	colored,
	...rest
}) => {
	return (
		<button
			className={cn(s[size], { [s.colored]: colored, className })}
			{...rest}
		>
			{children}
		</button>
	)
}
