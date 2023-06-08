import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ICourseCard2 } from '@/components/ui/text-cards/CourseCard/course-card.interface'

import { CoursesService } from '@/services/courses.service'

import { toastError } from '@/utils/api/withToastrErrorRedux'

export const useUsersCourses = (userId: string) => {
	const [usersCourses, setUsersCourses] = useState<ICourseCard2[]>([])

	const { data } = useQuery(
		["get user's courses", userId],
		() => CoursesService.getCreatedByUser(userId),
		{
			onSuccess(data: ICourseCard2[]) {
				setUsersCourses(data)
			},
			enabled: !!userId,
		}
	)

	return {
		usersCourses,
	}
}
