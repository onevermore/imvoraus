export interface IText {
	title: string
	description: string
	text: string
	complexity: number
	slug: string
	course: string
}

export interface ITextForm {
	title: string
	description: string
	text: string
	slug: string
}

export interface ITextData {
	imageURL: string
	title: string
	slug: string
	description: string
	text: string
	complexity: number
	_id: string
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
	_id: string
}
