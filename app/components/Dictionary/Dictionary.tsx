import cn from 'classnames'
import { FC, memo, useState } from 'react'

import s from './Dictionary.module.scss'

interface ITranslate {
	word: string
	translation: string
}

const Dictionary: FC<{
	list: ITranslate[]
	setList: (list: ITranslate[]) => void
}> = memo(({ list, setList }) => {
	const [isEdit, setIsEdit] = useState(false)
	const [currEditableWord, setCurrEditableWord] = useState<null | number>(null)

	//console.count('Dictionary rendered')

	const handleDeleteWord = (i: number) => {
		const newList = list.filter((v, index) => index !== i)
		setList(newList)
	}

	const handleChangeTranslation = (e: any, i: number) => {
		setIsEdit(!isEdit)
		setCurrEditableWord(i)

		if (isEdit) {
			//	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
			const newListt = list.map((row, index) => {
				if (index === i) {
					row.translation = e.target
						.closest('td')
						.querySelector('div').textContent
				}
				return row
			})
			setList(newListt)
		}
	}

	return (
		<table className={s.table}>
			<thead className={s.thead}>
				<tr>
					<th>Word</th>
					<th>Translation</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{list?.map((value, i) => (
					<tr className={s.tr} key={i}>
						<td className={s.td}>{value.word}</td>
						<td className={cn(s.td, s.flexx)}>
							<div
								className={cn({
									[s.editable]: isEdit && i === currEditableWord,
								})}
								suppressContentEditableWarning={true}
								contentEditable={i === currEditableWord && isEdit}
							>
								{value.translation}
							</div>
							<button
								className={s.btn}
								onClick={(e) => handleChangeTranslation(e, i)}
							>
								{i === currEditableWord && isEdit ? 'Save' : 'Edit'}
							</button>
						</td>
						<td className={s.td}>
							<button className={s.btn} onClick={() => handleDeleteWord(i)}>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
})

Dictionary.displayName = 'Dictionary'

export default Dictionary
