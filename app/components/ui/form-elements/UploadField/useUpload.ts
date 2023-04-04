import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { FileService } from '@/services/file.service'

import { IUserState } from '@/store/user/user.interface'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder: string,
	user: IUserState | null
) => {
	uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder, user) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation(
		['upload file'],
		(data: FormData) => FileService.upload(data, user?.username, folder),
		{
			onSuccess({ data }) {
				console.log('uiiiii ======= ', data)
				onChange(data.url)
			},
		}
	)

	const uploadImage = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files
			if (files?.length) {
				const formData = new FormData()
				formData.append('image', files[0])
				await mutateAsync(formData)

				setTimeout(() => {
					setIsLoading(false)
				}, 1000)
			}
		},
		[mutateAsync]
	)

	return useMemo(() => ({ uploadImage, isLoading }), [uploadImage, isLoading])
}
