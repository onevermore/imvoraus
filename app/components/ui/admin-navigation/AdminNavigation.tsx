import AdminNavItem from './AdminNavItem'
import { navAdminItems } from './admin-navigation.data'

import s from './AdminNav.module.scss'

export const AdminNavigation = () => {
	return (
		<nav className={s.nav}>
			<ul>
				{navAdminItems.map((item) => (
					<AdminNavItem navItem={item} key={item.link} />
				))}
			</ul>
		</nav>
	)
}
