import { axiosClassic } from 'api/interceptors'

import { IText } from '@/shared/types/text.types'

import { getTextsUrl } from '@/config/api.config'

export const TextsService = {
	async getTextBySlug(slug: string) {
		const { data } = await axiosClassic.get(getTextsUrl(`/by-slug/${slug}`))
		return data
	},

	async getAllTexts() {
		const { data } = await axiosClassic.get(getTextsUrl(''))
		return data
	},

	async createText(text: IText) {
		const { data } = await axiosClassic.post(getTextsUrl(''), text)
		return data
	},
}
