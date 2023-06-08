import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { useDebounce } from '@/hooks/useDebounce'

import {
	IText,
	ITextDataFull,
	ITextPaginatedData,
} from '@/shared/types/text.types'

import { TextsService } from '@/services/texts.service'

import { toastError } from '@/utils/api/withToastrErrorRedux'

import { getAdminUrl } from '@/config/url.config'

export const useTexts = () => {
	const [searchTerm, setSearchTerm] = useState('')
	//const debouncedSearch = useDebounce(searchTerm, 500)

	const [page, setPage] = useState(1)

	const queryData = useQuery(
		['textss list', page],
		() => TextsService.getAllTexts(page),
		{
			select: (data: ITextPaginatedData) => {
				const texts = data.texts.map((text: ITextDataFull) => ({
					_id: text._id,
					editUrl: getAdminUrl(`text/edit/${text._id}`),
					items: [text.title, text.description, text.complexity],
				}))
				const textData = {
					texts,
					total: data.total,
					totalPages: data.totalPages,
					page: data.page,
				}
				return textData
			},

			onError(error) {
				toastError(error, 'texts list')
			},
			onSuccess(data) {
				//	console.log('success data === ', data)
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createText } = useMutation({
		mutationFn: (textData: IText) => {
			return TextsService.createText(textData)
		},
		onError(error) {
			toastError(error, 'Create text')
		},
		onSuccess({ data: _id }) {
			toastr.success('Create text', 'create was successful')
			push(getAdminUrl(`text/edit/${_id}`))
		},
	})

	const { mutateAsync: deleteText } = useMutation(
		['delete text'],
		(textId: string) => TextsService.delete(textId),
		{
			onError(error) {
				toastError(error, 'Delete text')
			},
			onSuccess() {
				toastr.success('Delete text', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteText,
			createText,
			setPage,
		}),
		[queryData, searchTerm, deleteText, createText]
	)
}
