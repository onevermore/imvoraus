import { Navigation } from './Navigation/Navigation'

import { FC } from 'react'

import s from './Layout.module.scss'

interface ILayout {
	children?: React.ReactNode
}
export const Layout: FC<ILayout> = ({ children }) => {
	return (
		<div className={s.layout}>
			<Navigation />
			<div className={s.center}>{children}</div>

			
		</div>
	)
}
