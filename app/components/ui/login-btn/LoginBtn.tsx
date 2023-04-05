import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

import { Button } from '../form-elements/Button'

export const LoginBtn = () => {
	const { data: session } = useSession()

	if (session) {
		return (
			<div className="flex justify-center gap-5 pr-8 sm:pr-0">
				<div className="self-start">
					{' '}
					{session.user && session.user.image && (
						<Image
							src={session.user.image}
							width={50}
							height={50}
							alt=""
							style={{ borderRadius: '50px' }}
						/>
					)}
				</div>
				<p className="hidden 2xl:block pt-2 ">
					<b>
						{' '}
						{session.user?.email?.slice(
							0,
							session.user?.email.indexOf('@')
						)}{' '}
					</b>
				</p>

				<Button className="w-9 h-3 -mt-8 " colored onClick={() => signOut()}>
					Sign out
				</Button>
			</div>
		)
	}

	return (
		<div className="flex justify-center shrink-0 pr-8 ">
			<Button className="w-9 h-3 -mt-8" colored onClick={() => signIn()}>
				Sign in
			</Button>
		</div>
	)
}
