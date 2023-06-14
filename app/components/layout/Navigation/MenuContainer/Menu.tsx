import { AdmItem } from './AdmItem'
import { MenuItem } from './MenuItem'
import { IMenu } from './menu.interface'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import s from './Menu.module.scss'

export const Menu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
	return (
		<ul className={s.items}>
			{items.map((item) => (
				<MenuItem item={item} key={item.link} />
			))}
			<AdmItem />
		</ul>
	)
}
