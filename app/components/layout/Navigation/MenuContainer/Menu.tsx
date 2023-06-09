import { MenuItem } from './MenuItem'
import { IMenu } from './menu.interface'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { MaterialIcon } from '@/components/ui/MaterialIcon'

import { useAuth } from '@/hooks/useAuth'

import { Role } from '@/store/user/user.interface'

import s from './Menu.module.scss'

export const Menu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
	const { user } = useAuth()
	const { asPath } = useRouter()
	return (
		<ul className={s.items}>
			{items.map((item) => (
				<MenuItem item={item} key={item.link} />
			))}
			{user?.roles?.includes(Role.Admin) && (
				<li
					className={cn({
						[s.active]: asPath.startsWith('/manage'),
					})}
				>
					<Link href={'/manage/courses'}>
						<a>
							<MaterialIcon name={'MdDashboard'} />
							<span>{'AdminPanel'}</span>
						</a>
					</Link>
				</li>
			)}
		</ul>
	)
}
