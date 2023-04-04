import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { UsersService } from '@/services/user.service'

import { getAdminUrl } from '@/config/url.config'

export const useAvatarEdit = (setValue: UseFormSetValue<any>) => {
	const { query, push } = useRouter()

	const userId = String(query.id)

	const { isLoading } = useQuery(
		['user', userId],
		() => UsersService.getUserDataByUsername(userId),
		{
			onSuccess({ data }) {
				//	getKeys(data).forEach((key) => {
				//		setValue(key, data[key])
				//	})
			},
			onError(error) {},
			enabled: !!query.id,
		}
	)
	/*
	const { mutateAsync } = useMutation(
		'update user',
		(data: IMovieEditInput) => UsersService.update(userId, data),
		{
			onError(error) {
				toastError(error, 'Update movie')
			},
			onSuccess() {
				toastr.success('Update movie', 'update was successful')
				push(getAdminUrl('users'))
			},
		}
	)

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data)
	}
*/
	//return { onSubmit, isLoading }
}
