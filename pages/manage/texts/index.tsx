import { TextsList } from '@/components/screens/admin/texts/TextsList'

import { NextPageAuth } from '@/shared/types/auth.types'

const TextsPage: NextPageAuth = () => {
	return <TextsList />
}

TextsPage.isAdmin = true
export default TextsPage
