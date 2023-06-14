import RegisterFields from './RegisterFields'
import { IReg, IRegFull } from './auth.interface'
import { useRedirect } from './useRedirect'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/form-elements/Button'
import { Heading } from '@/components/ui/heading/Heading'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import styles from './Auth.module.scss'

export const Register = () => {
	useRedirect()

	const { isLoading } = useAuth()

	const {
		register: registerInput,
		handleSubmit,
		formState,
		getValues,
		reset,
	} = useForm<IRegFull>({
		mode: 'onChange',
	})

	const { register } = useActions()

	const onSubmit: SubmitHandler<IRegFull> = (data) => {
		const { passwordConfirm, ...formData } = getValues()
		register(formData)
		//	console.log('data === ', data)
		//	console.log('regData === ', regData)
		reset()
	}

	return (
		<>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Register" className="mb-6" />
					<RegisterFields
						getValues={getValues}
						register={registerInput}
						formState={formState}
					/>

					<div className={styles.buttons}>
						<Link href={'/auth/login'}>Login</Link>
						<Button
							className={styles.active}
							type="submit"
							disabled={isLoading}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</>
	)
}
