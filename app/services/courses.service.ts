import { axiosClassic } from 'api/interceptors'

import { ICourseCard } from '@/components/ui/text-cards/CourseCard/course-card.interface'

import { ICourse } from '@/shared/types/create-course.types'

import {
	getCoursesUrl,
	getTextsByCourseURL,
	getTextsUrl,
} from '@/config/api.config'

export const CoursesService = {
	async getCourseDataBySlug(slug: string) {
		const { data } = await axiosClassic.get(getCoursesUrl(`/by-slug/${slug}`))
		return data
	},

	async getAllCourses(searchTerm?: string, level?: string) {
		let filterParams = {}
		if (searchTerm) filterParams = { searchTerm }
		if (level) filterParams = { ...filterParams, level }
		//	console.log('filter ==== ', filterParams)
		const { data } = await axiosClassic.get(getCoursesUrl(''), {
			params: filterParams,
		})
		return data
	},

	async getAllCoursesWithtexts() {
		const { data } = await axiosClassic.get(getCoursesUrl(''))
		return data
	},

	async getCourseTexts(course: string) {
		const { data } = await axiosClassic.get(getTextsByCourseURL(course))
	},

	async createCourse(course: ICourse) {
		const { data } = await axiosClassic.post(getCoursesUrl(''), course)
		return data
	},
}
