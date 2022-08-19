import { MenuItem } from './MenuItem'
import { AuthItems } from './auth/AuthItems'
import { IMenu } from './menu.interface'
import { FC } from 'react'

import s from './Menu.module.scss'

export const Menu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
	return (
		<div className={s.menu}>
			<ul className={s.items}>
				{items.map((item) => (
					<MenuItem item={item} key={item.link} />
				))}
			</ul>
		</div>
	)
}
