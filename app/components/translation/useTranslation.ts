import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { TranslationService } from 'services/translation.service'

export const useTranslation = () => {
	const [word, setWord] = useState('')

	const { isSuccess, data, error, isLoading } = useQuery(
		['translation-data', word],
		() => TranslationService.getTranslateWord(word),
		{
			//select: ({ data }) => data.responseData.translatedText,
			enabled: word.length > 0,
		}
	)

	//console.log('useTranslation data: ', data)
	return { isSuccess, data, word, error, setWord, isLoading }
}
