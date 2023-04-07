import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { ICrosswordFull } from '@/components/ui/crossword-elements/CrosswordList/CrosswordList'
import { Button } from '@/components/ui/form-elements/Button'
import { ITextDataFull } from '@/components/ui/text-cards/TextCard/text.interface'

import { IText } from '../../../../pages/courses/[slug]/text/[textId]'

const DynamicTextsList = dynamic(
	() => import('@/components/ui/text-cards/TextsList/TextsList'),
	{
		ssr: false,
	}
)

const DynamicCrosswordsList = dynamic(
	() =>
		import('@/components/ui/crossword-elements/CrosswordList/CrosswordList'),
	{
		ssr: false,
	}
)

export interface ICourseData {
	_id: string
	title: string
	description: string
	texts: ITextDataFull[]
	crosswords: ICrosswordFull[]
	imageURL?: string
}

export const CourseContent = ({ courseData }: { courseData: ICourseData }) => {
	const router = useRouter()

	return (
		<div>
			<div className="font-extrabold">{courseData?.title} </div>
			<Button colored onClick={() => router.back()}>
				Back
			</Button>
			{courseData.texts.length > 0 && (
				<DynamicTextsList list={courseData.texts} />
			)}
			{courseData.crosswords.length > 0 && (
				<DynamicCrosswordsList crosswords={courseData.crosswords} />
			)}
		</div>
	)
}
