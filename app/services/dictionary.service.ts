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
		const { data } = await axiosClassic.post(
			getDictionaryUrl('/add-word'),
			wordData
		)
		return data
	},

	async getWordsByTextForUser(textId: string, userId: string) {
		const { data } = await axiosClassic.get(
			getDictionaryUrl(`/${textId}/words/${userId}`)
		)
		return data
	},

	async getDictionaryByUser(userId: string) {
		const { data } = await axiosClassic.get(
			getDictionaryUrl(`/all-words/${userId}`)
		)
		return data
	},
}
