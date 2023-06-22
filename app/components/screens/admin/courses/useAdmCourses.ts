import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import { ICourseCard2 } from '@/components/ui/text-cards/CourseCard/course-card.interface'

import { useDebounce } from '@/hooks/useDebounce'

import {
	ICourse,
	ICoursePaginatedData,
} from '@/shared/types/create-course.types'
import {
	IText,
	ITextDataFull,
	ITextPaginatedData,
} from '@/shared/types/text.types'

import { CoursesService } from '@/services/courses.service'
import { TextsService } from '@/services/texts.service'

import { toastError } from '@/utils/api/withToastrErrorRedux'

import { getAdminUrl } from '@/config/url.config'

export const useAdmCourses = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	/*const [cLevel, setCLevel] = useState('')
	const [name, setName] = useQueryParam('name', withDefault(StringParam, ''))
	const debouncedSearch2 = useDebounce(name, 500)
*/
	const [page, setPage] = useState(1)

	const queryData = useQuery(
		['courses list', page],
		() =>
			CoursesService.getPaginatedCourses({
				page,
			}),
		{
			select: (data: ICoursePaginatedData) => {
				const courses = data.courses.map((course: ICourseCard2) => ({
					_id: course._id,
					editUrl: getAdminUrl(`course/edit/${course._id}`),
					items: [
						course.title,
						course.description,
						course.level,
						course.price,
						course.ownerId,
						!course.isPublic && course.allowedUsers
							? course.allowedUsers.length
							: 'all',
					],
				}))
				const courseData = {
					courses,
					total: data.total,
					totalPages: data.totalPages,
					page: data.page,
				}
				return courseData
			},

			onError(error) {
				toastError(error, 'courses list')
			},
			onSuccess(data) {
				//console.log('success course data === ', data)
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createCourse } = useMutation({
		mutationFn: (courseData: ICourse) => {
			return CoursesService.createCourse(courseData)
		},
		onError(error) {
			toastError(error, 'Create course')
		},
		onSuccess({ data: _id }) {
			toastr.success('Create course', 'create was successful')
			push(getAdminUrl(`courses`))
			//course/edit/${_id}
		},
	})

	const { mutateAsync: deleteCourse } = useMutation(
		['delete text'],
		(textId: string) => CoursesService.delete(textId),
		{
			onError(error) {
				toastError(error, 'Delete course')
			},
			onSuccess() {
				toastr.success('Delete course', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteCourse,
			createCourse,
			setPage,
		}),
		[queryData, searchTerm, deleteCourse, createCourse]
	)
}
