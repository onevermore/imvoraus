import { useQuery } from '@tanstack/react-query'
import { GenreService } from 'services/genre.service'
import { TranslationService } from 'services/translation.service'

export const useTranslation = () => {
	const queryData = useQuery(['translation-data'], () =>
		TranslationService.getTranslation('hello') || { translatedText: 'hello' }
	)

	return queryData
}
