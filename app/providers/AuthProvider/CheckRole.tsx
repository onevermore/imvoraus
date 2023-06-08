import { useRouter } from 'next/router'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import { Role } from '@/store/user/user.interface'

const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isAdmin, isUser, isSuper },
}) => {
	const { user } = useAuth()

	const router = useRouter()

	const Children = () => <>{children}</>

	// if
	if (!isAdmin && !isUser && !isSuper) return <Children />

	if (user?.roles.includes(Role.Admin)) return <Children />

	if (isAdmin) {
		router.pathname !== '/404' && router.replace('/404')
		return null
	}

	if (isSuper && user?.roles.includes(Role.Super)) return <Children />

	if (isSuper) {
		router.pathname !== '/404' && router.replace('/404')
		return null
	}

	if (user && isUser) return <Children />
	else {
		router.pathname !== '/auth' && router.replace('/auth')
		return null
	}
}

export default CheckRole
