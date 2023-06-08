export interface ICourseCard {
	_id: string
	title: string
	description: string
	level: string
	price: number
	slug: string
	imageURL: string
	allowedUsers?: string[]
	isPublic: boolean
	ownerId: string
}

export interface ICourseCard2 extends ICourseCard {
	__v: number
	createdAt: string
	updatedAt: string
}
