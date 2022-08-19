import { IButtonn } from './form.interface'
import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import s from './form.module.scss'

export const Button: FC<PropsWithChildren<IButtonn>> = ({
	children,
	className,
	size = 'small',
}) => {
	return <button className={cn(s[size], { className })}>{children}</button>
}
