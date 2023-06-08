import { axiosClassic } from 'api/interceptors'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { MyCrossword } from '@/components/ui/crossword-elements/crossword/Crossword'

import { ICrossCommon, ICrossDataCommon } from '@/shared/types/crossword.types'

import { convertCrossData } from '@/utils/crossword/convertCrossData'

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const crossSlug = context.params?.crossId

	let { data } = await axiosClassic.get(`/crosswords/by-slug/${crossSlug}`)
	let { title, description, data: crossData } = data
	const myCrossword = { title, description, crossData }

	return {
		props: {
			crossword: myCrossword,
		},
	}
}

const Crossworddd: NextPage<{ crossword: ICrossCommon }> = ({ crossword }) => {
	const s = convertCrossData(crossword.crossData)

	const onAllCorrect = () => {
		//	confirm('good job!')
	}

	return (
		<MyCrossword
			title={crossword?.title || ''}
			description={crossword?.description || 'New crossword'}
			crossData={s}
			onCrosswordCorrect={onAllCorrect}
		/>
	)
}

export default Crossworddd
