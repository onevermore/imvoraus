import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'

import { ICourse } from '@/shared/types/create-course.types'

import { CoursesService } from '@/services/courses.service'

const DynamicTextsList = dynamic(
	() => import('@/components/ui/text-cards/TextsList/TextsList'),
	{
		ssr: false,
	}
)

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const courseSlug = String(params?.slug)

	try {
		const courseData = await CoursesService.getCourseDataBySlug(courseSlug)

		return {
			props: { courseTexts: courseData.texts },
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
		console.log('error ===== ', e)
		return {
			paths: [],
			fallback: false,
		}
	}
}

const CourseTexts: NextPage<any> = ({ courseTexts }) => {
	return (
		<div>
			<DynamicTextsList list={courseTexts} full />
		</div>
	)
}

export default CourseTexts
