import { GetStaticPaths, GetStaticProps } from 'next'

import { MyCourseEdit } from '@/components/screens/admin/courses/MyCourseEdit'
import { TextEdit } from '@/components/screens/admin/text/TextEdit'
import { ICourseData } from '@/components/screens/course-content/CourseContent'

import { NextPageAuth } from '@/shared/types/auth.types'
import { ICourse } from '@/shared/types/create-course.types'

import { CoursesService } from '@/services/courses.service'

export const getStaticPaths: GetStaticPaths = async () => {
	//	const data = await CoursesService.getAllCourses()

	//const courses = await CoursesService.getAllCourses()

	try {
		const courses = await CoursesService.getAllCourses()
		const paths = courses.map((g: ICourse) => ({
			params: { courseSlug: g.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const courseSlug = String(params?.courseSlug)

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

const MyCourseEditPage: NextPageAuth<{ courseData: ICourseData }> = ({
	courseData,
}) => {
	return <MyCourseEdit courseData={courseData} />
}

MyCourseEditPage.isUser = true

export default MyCourseEditPage
