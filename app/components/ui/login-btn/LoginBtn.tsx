import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

import { Button } from '../form-elements/Button'

export const LoginBtn = () => {
	const { data: session } = useSession()

	if (session) {
		return (
			<div className="flex-center-between gap-5">
				{session.user && session.user.image && (
					<Image
						src={session.user.image}
						width={50}
						height={50}
						alt=""
						style={{ borderRadius: '50px' }}
					/>
				)}

				<p className="invisible 2xl:visible">
					Signed in as <b> {session.user?.email} </b>
				</p>

				<Button colored onClick={() => signOut()}>
					Sign out
				</Button>
			</div>
		)
	}

	return (
		<div className="flex-center-between">
			<p className="invisible 2xl:visible">You are not signed in </p>
			<Button colored onClick={() => signIn()}>
				Sign in
			</Button>
		</div>
	)
}
