import axios from 'axios'

export const TranslationService = {
	async getTranslateWord(text: string, lang = 'de|az') {
		const res = await fetch(
			`https://api.mymemory.translated.net/get?q=${text}&langpair=${lang}`
		)
		const body = await res.json()

		return body
	},

}
