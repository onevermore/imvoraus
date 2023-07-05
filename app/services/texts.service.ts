import axios, { axiosClassic } from 'api/interceptors'

import { IText, ITextPaginatedData } from '@/shared/types/text.types'

import { getTextsUrl } from '@/config/api.config'

export const TextsService = {
	async getTextBySlug(slug: string) {
		const { data } = await axiosClassic.get(getTextsUrl(`/by-slug/${slug}`))
		//	console.log('text Service returned text: ', data)
		return data
	},

	async getAllTexts(page = 1, limit = 10): Promise<ITextPaginatedData> {
		let filterParams = {}
		if (page) filterParams = { page }
		if (limit) filterParams = { ...filterParams, limit }

		const { data } = await axiosClassic.get(getTextsUrl(''), {
			params: filterParams,
		})
		//console.log('text service data === ', data)
		return data
	},

	async getById(id: string) {
		const { data } = await axiosClassic.get(getTextsUrl(`/${id}`))
		return data
	},

	async createText(text: IText) {
		const { data } = await axios.post(getTextsUrl(''), text)
		return data
	},

	async update(_id: string, data: IText) {
		//console.log('update service === ', data)
		return axios.put<string>(getTextsUrl(`/${_id}`), data)
	},

	async delete(_id: string) {
		return axios.delete<string>(getTextsUrl(`/${_id}`))
	},
}
