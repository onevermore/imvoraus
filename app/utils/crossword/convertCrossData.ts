import { ICrossData, ICrossDataCommon } from '@/shared/types/crossword.types'

export const convertCrossData = (crossword: ICrossData[]) => {
	const cross = crossword.reduce(
		(acc: ICrossDataCommon, val) => {
			if (val['direction'] === 'across') {
				acc['across'][val.id] = {
					clue: val.clue,
					answer: val.answer,
					row: val.row,
					col: val.col,
				}
			}
			if (val['direction'] === 'down') {
				acc['down'][val.id] = {
					clue: val.clue,
					answer: val.answer,
					row: val.row,
					col: val.col,
				}
			}
			return acc
		},
		{ across: {}, down: {} }
	)
	return cross
}
