import axios, { axiosClassic } from 'api/interceptors'

import { IAddWord } from '@/shared/types/dictionary.types'

import { getDictionaryUrl, getTextsUrl } from '@/config/api.config'

export const DictionaryService = {
	/*	async getById(id: string) {
		const { data } = await axiosClassic.get(getTextsUrl(`/${id}`))
		return data
	},
*/
	async addWord(wordData: IAddWord) {
		const { data } = await axios.post(getDictionaryUrl('/add-word'), wordData)
		return data
	},

	async getWordsByTextForUser(userId: string, textId?: string) {
		let filterParams = {}
		if (textId) filterParams = { textId }

		const { data } = await axiosClassic.get(
			getDictionaryUrl(`/${userId}/words`),
			{
				params: filterParams,
			}
		)
		return data
	},

	async getDictionaryByUser(userId: string) {
		const { data } = await axiosClassic.get(
			getDictionaryUrl(`/all-words/${userId}`)
		)
		return data
	},

	async deleteWordFromUsersDictionary({
		wordId,
		userId,
	}: {
		wordId: string
		userId: string
	}) {
		const { data } = await axios.delete(
			getDictionaryUrl(`/${userId}/words/${wordId}`)
		)
		return data
	},
}
