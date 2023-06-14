import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { Button } from '../form-elements/Button'

export const SignBtn = () => {
	const { logout } = useActions()

	const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		logout()
	}

	const { user } = useAuth()
	const router = useRouter()

	if (user) {
		return (
			<div className="flex justify-center gap-5 px-8 sm:px-3">
				<p className="hidden 2xl:block pt-2 ">
					<b>
						<Link href={'/profile'}>{user?.username}</Link>
					</b>
				</p>

				<Button className=" min-w-max" colored onClick={logoutHandler}>
					Sign out
				</Button>
			</div>
		)
	}

	return (
		<div className="flex justify-center shrink-0 pr-8 ">
			<Button
				size="large"
				className=" min-w-max"
				colored
				onClick={() => router.push('/auth')}
			>
				Sign in
			</Button>
		</div>
	)
}
