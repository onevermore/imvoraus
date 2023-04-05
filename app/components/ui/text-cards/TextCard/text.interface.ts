export interface ITextData {
	imageURL: string
	title: string
	slug: string
	description: string
	text: string
	complexity: number
}

export interface ITextDataFull {
	imageURL?: string
	title: string
	slug: string
	description: string
	text: string
	complexity: number
	course: string
	createdAt: string
	updatedAt: string
	__v: number
}
