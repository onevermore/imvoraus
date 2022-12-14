import { useQuery } from '@tanstack/react-query'
import { TranslationService } from 'services/translation.service'

export const useTranslation = () => {
	const queryData = useQuery(['translation-data'], () =>
		TranslationService.getTranslation('hello') || { translatedText: 'hello' }
	)

	return queryData
}
