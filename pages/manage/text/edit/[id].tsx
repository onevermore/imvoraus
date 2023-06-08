import { TextEdit } from '@/components/screens/admin/text/TextEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const TextEditPage: NextPageAuth = () => {
	return <TextEdit />
}

TextEditPage.isAdmin = true

export default TextEditPage
