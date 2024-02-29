import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { Heading } from '@/components/ui/heading/Heading'

import { Meta } from '@/utils/meta/Meta'

const DynamicSeacrhableCourses = dynamic(
	() => import('@/components/screens/courses/CoursesSearchable'),
	{
		ssr: false,
	}
)

const Courses: NextPage = () => {
	return (
		<Meta title="Our courses">
			<div>
				<Heading title="Courses" className="mb-4" />
				<DynamicSeacrhableCourses />
			</div>
		</Meta>
	)
}

export default Courses
