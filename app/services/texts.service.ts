import axios, { axiosClassic } from 'api/interceptors'

import { IText } from '@/shared/types/text.types'

import { getTextsUrl } from '@/config/api.config'

export const TextsService = {
	async getTextBySlug(slug: string) {
		const { data } = await axiosClassic.get(getTextsUrl(`/by-slug/${slug}`))
		//	console.log('text Service returned text: ', data)
		return data
	},

	async getAllTexts() {
		const { data } = await axiosClassic.get(getTextsUrl(''))
		return data
	},

	async getById(id: string) {
		const { data } = await axiosClassic.get(getTextsUrl(`/${id}`))
		return data
	},

	async createText(text: IText) {
		const { data } = await axiosClassic.post(getTextsUrl(''), text)
		return data
	},

	async update(_id: string, data: IText) {
		console.log('update service === ', data)
		return axios.put<string>(getTextsUrl(`/${_id}`), data)
	},
}
