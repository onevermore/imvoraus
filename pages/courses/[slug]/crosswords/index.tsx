import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'

import { ICourse } from '@/shared/types/create-course.types'

import { CoursesService } from '@/services/courses.service'

const DynamicCrosswordsList = dynamic(
	() =>
		import('@/components/ui/crossword-elements/CrosswordList/CrosswordList'),
	{
		ssr: false,
	}
)

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const courseSlug = String(params?.slug)

	try {
		const courseData = await CoursesService.getCourseDataBySlug(courseSlug)

		return {
			props: { courseCrosswords: courseData.crosswords },
		}
	} catch (e) {
		// console.log(e)

		return {
			props: {},
			// notFound: true,
		}
	}
}

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
		//	console.log('error ===== ', e)
		return {
			paths: [],
			fallback: false,
		}
	}
}

const CourseCrosswords: NextPage<any> = ({ courseCrosswords }) => {
	return (
		<div>
			<DynamicCrosswordsList crosswords={courseCrosswords} full />
		</div>
	)
}

export default CourseCrosswords
