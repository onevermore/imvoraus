export interface ICrossData {
	id: number
	direction: 'across' | 'down'
	clue: string
	answer: string
	row: number
	col: number
}

export interface ICross {
	title: string
	description: string
	level: string
	data: ICrossData[]
	complexity: number
	slug: string
	course: string
}

export interface ICrossDataCommon {
	across: Record<any, any>
	down: Record<any, any>
}
export interface ICrossData2 {
	id: number
	direction: string
	clue: string
	answer: string
	row: number
	col: number
}

export interface ICrossCommon {
	title: string
	description: string
	crossData: ICrossData[]
}

export interface ICrosswordFull {
	_id: string
	title: string
	description: string
	level: string
	data: ICrossData2[]
	complexity: number
	slug: string
	course: string
	createdAt: string
	updatedAt: string
	__v: number
}
