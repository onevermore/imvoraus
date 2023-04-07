import { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Button } from '@/components/ui/form-elements/Button'
import { ICourseCard } from '@/components/ui/text-cards/CourseCard/course-card.interface'
import CoursesList from '@/components/ui/text-cards/CoursesList/CoursesList'

import { CoursesService } from '@/services/courses.service'

import { getAdminUrl } from '@/config/url.config'

const DynamicCoursesList = dynamic(
	() => import('@/components/ui/text-cards/CoursesList/CoursesList'),
	{
		ssr: false,
	}
)

export const getStaticProps: GetStaticProps = async () => {
	try {
		const data = await CoursesService.getAllCourses()
		//console.log('MY DATA IS ==================================== ', data)
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
/*
export interface ICourseData {
	id: number
	title: string
	text: string
	dictionary: Array<string>
}
*/

const Courses: NextPage<{ courses: ICourseCard[] }> = ({ courses }) => {
	const { push } = useRouter()

	const onClick = () => {
		push(getAdminUrl('/course/create'))
	}
	//console.log('ccc = ', courses)
	return (
		<div>
			<span> Courses page </span>
			<Button colored onClick={onClick}>
				Add new course
			</Button>
			<CoursesList courses={courses || []} />
		</div>
	)
}

export default Courses
