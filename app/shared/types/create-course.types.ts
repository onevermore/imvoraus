import { ICourseCard2 } from '@/components/ui/text-cards/CourseCard/course-card.interface'

export interface ICourse {
	title: string
	description: string
	level: string
	price: number
	slug: string
	allowedUsers?: string[]
	isPublic: boolean
	ownerId: string
}

export interface ICoursePaginatedData {
	courses: ICourseCard2[]
	total: number
	totalPages: number
	page: number
}
