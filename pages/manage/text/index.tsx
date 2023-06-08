import { GetStaticProps, NextPage } from 'next'

import { AdmTextList } from '@/components/screens/admin/text/AdmTextList'
import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'

import { NextPageAuth } from '@/shared/types/auth.types'
import { ITextDataFull } from '@/shared/types/text.types'

import { TextsService } from '@/services/texts.service'

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const textData = await TextsService.getAllTexts()
		//	console.log('text data = ', textData)
		return {
			props: { texts: textData },
		}
	} catch (e) {
		// console.log(e)

		return {
			props: {},
		}
	}
}

const ManageTexts: NextPageAuth<{ textData: ITextDataFull[] }> = ({
	textData,
}) => {
	return (
		<>
			<AdminNavigation />
			<AdmTextList list={textData} />
		</>
	)
}

ManageTexts.isAdmin = true

export default ManageTexts
