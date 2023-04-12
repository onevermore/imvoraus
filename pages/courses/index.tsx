import { NextPage } from 'next'

import CoursesSearchable from '@/components/screens/courses/CoursesSearchable'
import { Heading } from '@/components/ui/heading/Heading'

/*
const DynamicCoursesList = dynamic(
	() => import('@/components/ui/text-cards/CoursesList/CoursesList'),
	{
		ssr: false,
	}
)

export const getStaticProps: GetStaticProps = async () => {
	try {
		const data = await CoursesService.getAllCourses()

		const coursee: ICourseCard[] = data.map((course: ICourseCard) => ({
			_id: course._id,
			title: course.title,
			description: course.description,
			level: course.level,
			price: course.price,
			slug: course.slug,
		}))
		return {
			props: {
				courses: coursee,
			},
		}
	} catch (e) {
		console.log('courses page = ', e)
		return {
			props: {},
			// notFound: true,
		}
	}
}
*/ // <{ courses: ICourseCard[] }>
const Courses: NextPage = () => {
	return (
		<div>
			<Heading title="Courses" className="mb-4" />
			<CoursesSearchable />
		</div>
	)
}

export default Courses
