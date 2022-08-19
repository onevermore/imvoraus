import axios from 'axios'

export const TranslationService = {
	async getTranslation(searchWord: string) {
		const res = await fetch(
			`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200511T095640Z.e0bdff5300d82bf8.f5c91ab8627a7592117e7c7365ef6e2635999973&text=${searchWord}&lang=en-de`,
			{
				method: 'POST',
			}
		)
		console.log(await res.json())
		return await res.json()
	},
}
