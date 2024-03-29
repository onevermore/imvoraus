import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
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

import { IOptions2 } from '../select.types'

export const useCourses = (level: any, name: string) => {
	const [cLevel, setCLevel] = useState('')
	//	const [level, setLevel] = useQueryParam('level', withDefault(StringParam, ''))
	//	const [name, setName] = useQueryParam('name', withDefault(StringParam, ''))
	const debouncedSearch2 = useDebounce(name, 500)

	const [page, setPage] = useState(1)

	const queryData = useQuery(
		['courses list general', debouncedSearch2, level, page],
		() =>
			CoursesService.getPaginatedCourses({
				page,
				searchTerm: debouncedSearch2,
				level: level,
			}),
		{
			select: (data: ICoursePaginatedData) => {
				const courseData = {
					courses: data.courses,
					total: data.total,
					totalPages: data.totalPages,
					page: +data.page,
				}
				console.log('select data === ', courseData)
				return courseData
			},

			onError(error) {
				toastError(error, 'courses list general')
			},
			onSuccess(data) {
				//console.log('success course data === ', data)
			},
		}
	)

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
		['delete course'],
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
			...queryData,
			deleteCourse,
			createCourse,
			setPage,
		}),
		[queryData, deleteCourse, createCourse]
	)
}
