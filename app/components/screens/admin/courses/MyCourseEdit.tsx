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

export const MyCourseEdit = ({ courseData }: { courseData: ICourseData }) => {
	const router = useRouter()
	const { courseSlug } = router.query
	//console.count('Course content rendered')
	return (
		<div>
			<div className="font-extrabold">
				<span className="underline">Course:</span> {courseData?.title}{' '}
			</div>

			<div className="mt-8">
				<Button
					colored
					onClick={() =>
						router.push({
							pathname: '/manage/text/create',
							query: { courseName: courseData.title, cid: courseData._id },
						})
					}
				>
					Create Text
				</Button>
				{courseData.texts.length > 0 && (
					<>
						<DynamicTextsList list={courseData.texts} />
					</>
				)}
			</div>
			<div className="mt-8">
				<Button
					colored
					onClick={() =>
						router.push({
							pathname: '/manage/crossword/create',
							query: {
								courseName: courseData.title,
								cid: courseData._id,
							},
						})
					}
				>
					Create Crossword
				</Button>
				{courseData.crosswords.length > 0 && (
					<>
						<DynamicCrosswordsList crosswords={courseData.crosswords} />
						<div className="flex justify-end">
							<Button colored onClick={() => router.push('/profile')}>
								View all
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
