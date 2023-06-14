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

export const AdmItem: FC = () => {
	const { user } = useAuth()
	const { asPath } = useRouter()

	if (!user) {
		return null
	}

	return (
		<>
			{user?.roles?.includes(Role.Admin) && (
				<li
					className={cn({
						[s.active]: asPath.startsWith('/manage'),
					})}
				>
					<Link href={'/manage/courses'}>
						<MaterialIcon name={'MdDashboard'} />
						<span>{'AdminPanel'}</span>
					</Link>
				</li>
			)}
		</>
	)
}
