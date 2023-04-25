import { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/form-elements/Button'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import { DekorHeading } from '@/components/ui/heading-decor/DekorHeading'
import { Heading } from '@/components/ui/heading/Heading'

import { useAuth } from '@/hooks/useAuth'

import { IUserState } from '@/store/user/user.interface'

export const Profile: FC = () => {
	/*	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<{ avatar: string }>({
		mode: 'onChange',
	})
*/
	//	const { onSubmit, isLoading } = useAvatarEdit(setValue)

	const { user } = useAuth()
	const [userData, setUserData] = useState<IUserState | null>(null)

	useEffect(() => {
		setUserData(user)
	}, [])

	const onSubmit = () => {}

	return (
		<>
			<div>
				<Heading title="Profile" className="mb-10" />

				<div>
					<DekorHeading text="username" />
					<div>{userData?.username}</div>
					<DekorHeading text="email" />
					<div>{userData?.email}</div>
				</div>
			</div>
		</>
	)
}
