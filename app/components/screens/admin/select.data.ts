import { ILevelsOption, IOptions, IOptions2 } from './select.types'

export const optionsNumber: IOptions[] = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
]

export const optionsLevel: IOptions[] = [
	{ value: 'A1', label: 'A1' },
	{ value: 'A2', label: 'A2' },
	{ value: 'B1', label: 'B1' },
	{ value: 'B2', label: 'B2' },
	{ value: 'C1', label: 'C1' },
	{ value: 'C2', label: 'C2' },
]

export const optionsLevel2: IOptions2[] = [
	{ value: '', label: 'All' },
	{ value: 'A1', label: 'A1' },
	{ value: 'A2', label: 'A2' },
	{ value: 'B1', label: 'B1' },
	{ value: 'B2', label: 'B2' },
	{ value: 'C1', label: 'C1' },
	{ value: 'C2', label: 'C2' },
]

export const optionsDirection: IOptions[] = [
	{ value: 'across', label: 'across' },
	{ value: 'down', label: 'down' },
]
