import AuthFields from './AuthFields'
import { IAuth } from './auth.interface'
import { useRedirect } from './useRedirect'
import Link from 'next/link'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/form-elements/Button'
import { Heading } from '@/components/ui/heading/Heading'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import styles from './Auth.module.scss'

const Auth: FC = () => {
	useRedirect()

	const { isLoading } = useAuth()

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuth>({
		mode: 'onChange',
	})

	const { login } = useActions()

	const onSubmit: SubmitHandler<IAuth> = (data) => {
		login(data)

		reset()
	}

	return (
		<>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Auth" className="mb-6" />
					<AuthFields register={registerInput} formState={formState} />

					<div className={styles.buttons}>
						<Link href={'/auth/register'}>Register</Link>
						<Button
							className={styles.active}
							type="submit"
							disabled={isLoading}
						>
							Login
						</Button>
					</div>
				</form>
			</section>
		</>
	)
}

export default Auth
