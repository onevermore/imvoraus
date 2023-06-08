import { IRegFull } from './auth.interface'
import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-elements/Field'

import { validEmail } from '@/utils/auth/Regex'

interface IRegFields {
	register: UseFormRegister<any>
	formState: FormState<IRegFull>
	getValues: any
}

const RegisterFields: FC<IRegFields> = ({
	register,
	getValues,
	formState: { errors },
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required!',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email',
					},
				})}
				placeholder="E-mail"
				error={errors.email}
			/>
			<Field
				{...register('password', {
					required: 'Password is required!',
					minLength: {
						value: 6,
						message: 'Min length should more 6 symbols!',
					},
				})}
				placeholder="Password"
				type="password"
				error={errors.password}
			/>

			<Field
				{...register('passwordConfirm', {
					required: 'Confirmation is required!',
					validate: (value) =>
						value === getValues('password') || 'Passwords do not match',
				})}
				placeholder="Confirm password"
				type="password"
				error={errors.passwordConfirm}
			/>

			<Field
				{...register('birthdate', {
					required: 'Birth date is required!',
				})}
				placeholder="Birth Date"
				type="date"
				error={errors.birthdate}
			/>
		</>
	)
}

export default RegisterFields
