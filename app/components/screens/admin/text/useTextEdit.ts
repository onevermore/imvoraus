import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IText } from '@/shared/types/text.types'

import { TextsService } from '@/services/texts.service'

import { toastError } from '@/utils/api/withToastrErrorRedux'
import { getKeys } from '@/utils/object/getKeys'

import { getAdminUrl } from '@/config/url.config'

type fieldsType = keyof IText
export const useTextEdit = (setValue: UseFormSetValue<IText>) => {
	const { query, push } = useRouter()
	const [comp, setComp] = useState<number | null>(null)

	const textId = String(query.id)

	const { isLoading } = useQuery(
		['text', textId],
		() => TextsService.getById(textId),
		{
			onSuccess(data) {
				//	console.log('my data =', data)
				const fields: Record<fieldsType, boolean> = {
					course: true,
					text: true,
					complexity: true,
					description: true,
					title: true,
					slug: true,
				}
				const res = getKeys(data).forEach((key) => {
					if (fields[key as fieldsType]) {
						console.log(`setValue(${key.toString()}) to ${data[key]}`)
						setValue(key as fieldsType, data[key])
					}
					if (key === 'complexity') setComp(data[key])
				})
			},
			onError(error: any) {
				toastError(error, 'Get text')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		['update text'],
		(data: IText) => TextsService.update(textId, data),
		{
			onError(error: any) {
				//console.log('error === ', error)
				toastError(error, 'Update text')
			},
			onSuccess() {
				toastr.success('Update text', 'update was successful')
				push(getAdminUrl('text'))
			},
		}
	)

	const onSubmit: SubmitHandler<IText> = async (data) => {
		console.log('data ===== AA === ', data)
		await mutateAsync(data)
	}

	return { onSubmit, isLoading, comp }
}
