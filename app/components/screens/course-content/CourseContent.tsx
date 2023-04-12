import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Button } from '@/components/ui/form-elements/Button'
import { ITextDataFull } from '@/components/ui/text-cards/TextCard/text.interface'

import { ICrosswordFull } from '@/shared/types/crossword.types'

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
	const { slug: courseSlug } = router.query
	//console.count('Course content rendered')
	return (
		<div>
			<div className="font-extrabold">{courseData?.title} </div>
			<Button colored onClick={() => router.back()}>
				Back
			</Button>
			{courseData.texts.length > 0 && (
				<>
					<DynamicTextsList list={courseData.texts} />
					<div className="flex justify-end">
						<Button
							colored
							onClick={(e) => {
								e.preventDefault()
								router.push(`/courses/${courseSlug}/texts`, undefined, {
									shallow: true,
								})
							}}
						>
							View all
						</Button>
					</div>
				</>
			)}

			{courseData.crosswords.length > 0 && (
				<>
					<DynamicCrosswordsList crosswords={courseData.crosswords} />
					<div className="flex justify-end">
						<Button
							colored
							onClick={(e) => {
								e.preventDefault()
								router.push(`/courses/${courseSlug}/crosswords`, undefined, {
									shallow: true,
								})
							}}
						>
							View all
						</Button>
					</div>
				</>
			)}
		</div>
	)
}
