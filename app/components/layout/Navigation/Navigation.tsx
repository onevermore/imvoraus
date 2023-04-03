import { Logo } from './Logo'
import { MenuContainer } from './MenuContainer/MenuContainer'
import { SearchBar } from './SearchBar'
import { FC } from 'react'

import { LoginBtn } from '@/components/ui/login-btn/LoginBtn'

import s from './Navigation.module.scss'

const Navigation: FC = () => {
	return (
		<div className={s.container}>
			<Logo />
			<MenuContainer />
			<LoginBtn />
			<SearchBar />
		</div>
	)
}
export default Navigation
