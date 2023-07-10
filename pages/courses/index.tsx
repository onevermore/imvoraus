import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { Heading } from '@/components/ui/heading/Heading'

const DynamicSeacrhableCourses = dynamic(
	() => import('@/components/screens/courses/CoursesSearchable'),
	{
		ssr: false,
	}
)

const Courses: NextPage = () => {
	return (
		<div>
			<Heading title="Courses" className="mb-4" />
			<DynamicSeacrhableCourses />
		</div>
	)
}

export default Courses
