import { Logo } from './Logo'
import { MenuContainer } from './MenuContainer/MenuContainer'
import { SearchBar } from './SearchBar'
import { FC } from 'react'

import s from './Navigation.module.scss'

export const Navigation: FC = () => {
	return (
		<div className={s.navigation}>
			<Logo />
			<MenuContainer />
			<SearchBar />
		</div>
	)
}
