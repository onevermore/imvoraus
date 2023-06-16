import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { IAddWord, IDictionaryFull } from '@/shared/types/dictionary.types'

import { DictionaryService } from '@/services/dictionary.service'

import { toastError } from '@/utils/api/withToastrErrorRedux'

export const useUsersDictionary = (userId: string = '', textId?: string) => {
	const [usersDictionary, setUsersDictionary] = useState<IDictionaryFull[]>([])
	const queryClient = useQueryClient()
	//const { user } = useAuth()

	/*	const { data } = useQuery(
		["user's dictionary", userId],
		() => DictionaryService.getDictionaryByUser(userId),
		{
			onSuccess(data: IDictionaryFull[]) {
				setUsersDictionary(data)
			},
			enabled: !!userId,
		}
	)
*/
	const {
		isSuccess: isGood,
		isLoading: isLoad,
		isError,
		data: dictionaryList,
	} = useQuery(
		['dictionary list', userId, textId],
		() => DictionaryService.getWordsByTextForUser(userId || '', textId),
		{
			select: (data) =>
				data.map((wordd: IDictionaryFull) => ({
					userId: wordd.userId,
					_id: wordd._id,
					word: wordd.word,
					translation: wordd.translation,
				})),
			enabled: !!userId,
		}
	)

	const { mutateAsync: addWordAsync, isLoading: isLoadingAddWord } =
		useMutation({
			mutationFn: (dictionaryData: IAddWord) => {
				return DictionaryService.addWord(dictionaryData)
			},
			onError: (error, variables, context) => {
				toastError(error, 'Add word to dictionary')
			},
			onSuccess({ data: _id }) {
				toastr.success('Add word', 'word added successfully')
				queryClient.refetchQueries(['dictionary list'])
			},
		})

	const {
		mutateAsync: deleteWordAsync,
		isLoading: isLoadingDeleteWord,
		isSuccess: isSuccessDeleteWord,
	} = useMutation({
		mutationFn: (params: { wordId: string; userId: string }) => {
			return DictionaryService.deleteWordFromUsersDictionary({
				wordId: params.wordId,
				userId: params.userId,
			})
		},
		onError: (error) => {
			toastError(error, 'Delete word from dictionary')
		},
		onSuccess() {
			toastr.success('Delete word', 'delete was successful')
			queryClient.refetchQueries(['dictionary list'])
		},
	})

	return {
		usersDictionary,
		dictionaryList,
		addWordAsync,
		deleteWordAsync,
		isLoadingAddWord,
		isLoadingDeleteWord,
		isSuccessDeleteWord,
	}
}
