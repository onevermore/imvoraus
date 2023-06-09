import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITranslate } from '@/components/TextWithDictionary/TextWithDictionary2'
import { ICourseCard2 } from '@/components/ui/text-cards/CourseCard/course-card.interface'

import { IDictionaryFull } from '@/shared/types/dictionary.types'

import { CoursesService } from '@/services/courses.service'
import { DictionaryService } from '@/services/dictionary.service'

import { toastError } from '@/utils/api/withToastrErrorRedux'

export const useUsersDictionary = (userId: string) => {
	const [usersDictionary, setUsersDictionary] = useState<IDictionaryFull[]>([])

	const { data } = useQuery(
		["get user's dictionary", userId],
		() => DictionaryService.getDictionaryByUser(userId),
		{
			onSuccess(data: IDictionaryFull[]) {
				setUsersDictionary(data)
			},
			enabled: !!userId,
		}
	)

	return {
		usersDictionary,
	}
}
