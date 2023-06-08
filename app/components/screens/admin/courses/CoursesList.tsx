import { useCourses } from './useCourses'
import { useRouter } from 'next/router'

import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { AdmTable } from '@/components/ui/admin/AdminTable/AdmTable'
import { Button } from '@/components/ui/form-elements/Button'
import { Heading } from '@/components/ui/heading/Heading'
import { PaginationItems } from '@/components/ui/list-elements/PaginationItems'

import { getAdminUrl } from '@/config/url.config'

export const CoursesAdmList = () => {
	const {
		createCourse,
		setPage,
		data,
		isLoading,
		deleteCourse,
		searchTerm,
		handleSearch,
	} = useCourses()

	const { push } = useRouter()

	if (!data) {
		return <div>Loading...</div>
	}

	const { courses, page, total, totalPages } = data

	return (
		<>
			<AdminNavigation />

			<div className="flex items-center gap-8">
				<Heading title="Courses" />
				<Button rose onClick={() => push(getAdminUrl('course/create'))}>
					{' '}
					Add new Course
				</Button>
			</div>
			<PaginationItems
				page={page}
				totalPages={totalPages}
				onPrevClick={() => setPage((page) => page - 1)}
				onNextClick={() => setPage((page) => page + 1)}
			/>
			<AdmTable
				tableItems={courses || []}
				headerItems={[
					'Title',
					'Description',
					'Level',
					'Price',
					'owner_id',
					'allowedUsers',
				]}
				isLoading={isLoading}
				removeHandler={deleteCourse}
			/>
		</>
	)
}
