//import { Navigation } from './Navigation/Navigation'
import dynamic from 'next/dynamic'
import { FC } from 'react'

import s from './Layout.module.scss'

const DynamicNavigation = dynamic(() => import('./Navigation/Navigation'), {
	ssr: false,
})
interface ILayout {
	children?: React.ReactNode
}
export const Layout: FC<ILayout> = ({ children }) => {
	return (
		<div className={s.layout}>
			<DynamicNavigation />
			<div className={s.center}>{children}</div>
		</div>
	)
}
