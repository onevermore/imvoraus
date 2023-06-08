import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { CoursesService } from 'services/courses.service'

import {
	CourseContent,
	ICourseData,
} from '@/components/screens/course-content/CourseContent'

import { ICourse } from '@/shared/types/create-course.types'

export const getStaticPaths: GetStaticPaths = async () => {
	//	const data = await CoursesService.getAllCourses()

	//const courses = await CoursesService.getAllCourses()

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
		//console.log('error ===== ', e)

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

const CourseInfo: NextPage<{ courseData: ICourseData }> = ({ courseData }) => {
	return <CourseContent courseData={courseData} />
}

export default CourseInfo
