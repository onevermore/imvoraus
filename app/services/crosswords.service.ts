import { axiosClassic } from 'api/interceptors'

import { ICrossForm } from '@/components/screens/admin/crossword/CrosswordForm'

import { IText } from '@/shared/types/text.types'

import { getCrosswordsUrl } from '@/config/api.config'

export const CrosswordsService = {
	async getCrossBySlug(slug: string) {
		const { data } = await axiosClassic.get(
			getCrosswordsUrl(`/by-slug/${slug}`)
		)
		return data
	},

	async getAllCrosswords() {
		const { data } = await axiosClassic.get(getCrosswordsUrl(''))
		return data
	},

	async createCrossword(crossword: ICrossForm) {
		const { data } = await axiosClassic.post(getCrosswordsUrl(''), crossword)
		return data
	},
}
