import { BurgerMenu } from './BurgerMenu/BurgerMenu'
import { Logo } from './Logo'
import { MenuContainer } from './MenuContainer/MenuContainer'
import { SearchBar } from './SearchBar'
import { FC } from 'react'

import { SignBtn } from '@/components/ui/login-btn/SignBtn'

import s from './Navigation.module.scss'

const Navigation: FC = () => {
	return (
		<div className={s.container}>
			<Logo />
			<BurgerMenu />
			<MenuContainer />
			<SignBtn />
			<SearchBar />
		</div>
	)
}
export default Navigation
