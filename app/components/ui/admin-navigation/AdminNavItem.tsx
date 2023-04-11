import { INavItem } from './admin-navigation.data'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import s from './AdminNav.module.scss'

const AdminNavItem: FC<{ navItem: INavItem }> = ({ navItem }) => {
	const { asPath } = useRouter()

	return (
		<li>
			<Link href={navItem.link}>
				<a className={cn({ [s.active]: asPath === navItem.link })}>
					{navItem.title}
				</a>
			</Link>
		</li>
	)
}

export default AdminNavItem
