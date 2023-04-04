import { axiosClassic } from 'api/interceptors'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { MyCrossword } from '@/components/ui/crossword-elements/crossword/Crossword'

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const crossSlug = context.params?.crossId

	let { data } = await axiosClassic.get(`/crosswords/by-slug/${crossSlug}`)
	let { title, description, data: crosswordData } = data
	const myCrossword = { title, description, crosswordData }

	return {
		props: {
			crossword: myCrossword,
		},
	}
}

export interface ICrossData {
	across: Record<any, any>
	down: Record<any, any>
}

export interface ICrossData2 {
	id: number
	direction: string
	clue: string
	answer: string
	row: number
	col: number
}

export interface ICross {
	title: string
	description: string
	crosswordData: ICrossData2[]
}

const Crossworddd: NextPage<{ crossword: ICross }> = ({ crossword }) => {
	const s = crossword.crosswordData.reduce(
		(acc: ICrossData, val) => {
			if (val['direction'] === 'across') {
				acc['across'][val.id] = {
					clue: val.clue,
					answer: val.answer,
					row: val.row,
					col: val.col,
				}
			}
			if (val['direction'] === 'down') {
				acc['down'][val.id] = {
					clue: val.clue,
					answer: val.answer,
					row: val.row,
					col: val.col,
				}
			}
			return acc
		},
		{ across: {}, down: {} }
	)

	const onAllCorrect = () => {
		confirm('good job!')
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
