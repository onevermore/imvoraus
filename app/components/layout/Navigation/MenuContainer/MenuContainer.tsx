import { Menu } from './Menu'
import { firstMenu } from './menu.data'
import { FC } from 'react'

import s from './Menu.module.scss'

export const MenuContainer: FC = () => {
	return (
		<nav className={s.menu}>
			<Menu menu={firstMenu} />
		</nav>
	)
}
