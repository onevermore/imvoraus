import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/form-elements/Button'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'

export const Profile: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<{ avatar: string }>({
		mode: 'onChange',
	})

	//	const { onSubmit, isLoading } = useAvatarEdit(setValue)

	const onSubmit = () => {}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="avatar"
					control={control}
					defaultValue=""
					render={({ field: { value, onChange }, fieldState: { error } }) => (
						<UploadField
							placeholder="Avatar"
							error={error}
							folder="avatar"
							image={value}
							onChange={onChange}
						/>
					)}
					rules={{
						required: 'Avatar is required!',
					}}
				/>
				<Button colored>Save</Button>
			</form>
		</div>
	)
}
