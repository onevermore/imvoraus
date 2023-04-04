import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CoursesService } from 'services/courses.service'

import { Button } from '@/components/ui/form-elements/Button'

import { ICourse } from '@/shared/types/create-course.types'

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

export const getStaticPaths: GetStaticPaths = async () => {
	//	const data = await CoursesService.getAllCourses()

	try {
		const courses = await CoursesService.getAllCourses()
		const paths = courses.map((g: ICourse) => ({
			params: { slug: g.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		// console.log(errorCatch(e))
		console.log('error ===== ', e)
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const courseSlug = String(params?.slug)

	try {
		const courseData = await CoursesService.getCourseDataBySlug(courseSlug)

		return {
			props: { courseData },
		}
	} catch (e) {
		// console.log(e)

		return {
			props: {},
			// notFound: true,
		}
	}
}

const CourseInfo: NextPage<{ courseData: any }> = ({ courseData }) => {
	const router = useRouter()
	const courseSlug = String(router.query.slug)

	return (
		<div>
			<div className="font-extrabold">{courseData?.title} </div>
			<Button colored onClick={() => router.back()}>
				Back
			</Button>
			<DynamicTextsList list={courseData?.texts} />
			<DynamicCrosswordsList crosswords={courseData?.crosswords} />
		</div>
	)
}

export default CourseInfo
