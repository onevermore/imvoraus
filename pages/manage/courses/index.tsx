import { CoursesAdmList } from '@/components/screens/admin/courses/CoursesList'

import { NextPageAuth } from '@/shared/types/auth.types'

const CoursesPage: NextPageAuth = () => {
	return <CoursesAdmList />
}

CoursesPage.isAdmin = true

export default CoursesPage
