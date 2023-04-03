import { useMutation } from '@tanstack/react-query'
import { axiosClassic } from 'api/interceptors'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/form-elements/Button'
import { ICourseCard } from '@/components/ui/text-cards/CourseCard/course-card.interface'
import { CoursesList } from '@/components/ui/text-cards/CoursesList/CoursesList'

import { CoursesService } from '@/services/courses.service'

import { getCoursesUrl } from '@/config/api.config'
import { getAdminUrl } from '@/config/url.config'

export const getStaticProps: GetStaticProps = async () => {
	const res = await axiosClassic.get(getCoursesUrl(''))
	const data: ICourseCard[] = res.data.map((course: ICourseCard) => ({
		_id: course._id,
		title: course.title,
		description: course.description,
		level: course.level,
		price: course.price,
		slug: course.slug,
	}))
	return {
		props: {
			courses: data || [],
		},
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

	return (
		<div>
			<span> Courses page </span>
			<Button colored onClick={onClick}>
				Add new course
			</Button>
			<CoursesList courses={courses} />
		</div>
	)
}

export default Courses
