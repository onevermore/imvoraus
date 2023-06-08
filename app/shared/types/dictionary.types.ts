export interface IAddWord {
	userId: string
	courseId: string
	textId: string
	word: string
	translation: string
}

export interface IDictionaryFull {
	_id: string
	userId: string
	courseId: string
	textId: string
	word: string
	translation: string
	createdAt: string
	updatedAt: string
	__v: number
}
