import { WordsList } from '@/components/screens/wordsList/WordsList'

import { NextPageAuth } from '@/shared/types/auth.types'

const CoursesPage: NextPageAuth = () => {
	return <WordsList />
}

CoursesPage.isUser = true

export default CoursesPage
