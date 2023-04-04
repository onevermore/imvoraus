import textImage from '@/assets/images/zod.webp'

import { Heading } from '../../heading/Heading'
import { CrosswordCard } from '../CrosswordCard/CrosswordCard'

export interface ICrosswordData {
	id: number
	direction: string
	clue: string
	answer: string
	row: number
	col: number
}
export interface ICrossword {
	title: string
	description: string
	level: string
	data: ICrosswordData[]
	complexity: number
	slug: string
	course: string
}

export interface ICrosswordFull {
	_id: string
	title: string
	description: string
	level: string
	data: ICrosswordData[]
	complexity: number
	slug: string
	course: string
	createdAt: string
	updatedAt: string
	__v: number
}
const CrosswordList = ({ crosswords }: { crosswords: ICrosswordFull[] }) => {
	return (
		<>
			<Heading title="Crosswords" className="py-8" />
			<div className="w-[80%] mx-auto grid md:grid-cols-2 xl:grid-cols-3  gap-5">
				{crosswords.map((crossword) => (
					<CrosswordCard
						key={crossword._id}
						crossword={{ ...crossword, imageURL: textImage.src }}
					/>
				))}
			</div>
		</>
	)
}
export default CrosswordList
