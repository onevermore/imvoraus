import { NextPage } from 'next'

import { CourseForm } from '@/components/screens/admin/course/CourseForm'

import { NextPageAuth } from '@/shared/types/auth.types'

const CreateCourse: NextPageAuth = () => {
	return <CourseForm />
}
CreateCourse.isUser = true
export default CreateCourse
