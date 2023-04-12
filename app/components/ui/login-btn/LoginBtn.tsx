import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

import { Button } from '../form-elements/Button'

export const LoginBtn = () => {
	const { data: session } = useSession()

	if (session) {
		return (
			<div className="flex justify-center gap-5 px-8 sm:px-3">
				<div className="self-start w-8">
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

				<Button className=" min-w-max" colored onClick={() => signOut()}>
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
				onClick={() => signIn()}
			>
				Sign in
			</Button>
		</div>
	)
}
