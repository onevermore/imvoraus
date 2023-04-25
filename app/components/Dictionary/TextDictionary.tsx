import cn from 'classnames'
import { FC, memo, useState } from 'react'

import { MaterialIcon } from '../ui/MaterialIcon'

import s from './Dictionary.module.scss'

interface ITranslate {
	word: string
	translation: string
}

const TextDictionary: FC<{
	list: ITranslate[]
	setList: (list: ITranslate[]) => void
}> = memo(({ list, setList }) => {
	const [isEdit, setIsEdit] = useState(false)
	const [currEditableWord, setCurrEditableWord] = useState<null | number>(null)

	//console.count('TextDictionary rendered')

	const handleDeleteWord = (i: number) => {
		const newList = list.filter((v, index) => index !== i)
		setList(newList)
	}

	const handleChangeTranslation = (e: any, i: number) => {
		setIsEdit(!isEdit)
		setCurrEditableWord(i)

		if (isEdit) {
			const newListt = list.map((row, index) => {
				if (index === i) {
					row.translation =
						document.querySelector(`#translation-${i}`)?.textContent || ''
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
					<th></th>
				</tr>
			</thead>
			<tbody>
				{list?.map((value, i) => (
					<tr className={s.tr} key={i}>
						<td className={s.td}>{value.word}</td>
						<td className={cn(s.td)}>
							<div
								id={`translation-${i}`}
								className={cn({
									[s.editable]: isEdit && i === currEditableWord,
								})}
								suppressContentEditableWarning={true}
								contentEditable={i === currEditableWord && isEdit}
							>
								{value.translation}
							</div>
						</td>
						<td className={s.td}>
							<div className="flex items-center justify-end">
								<div
									className="cursor-pointer h-full"
									onClick={(e) => handleChangeTranslation(e, i)}
								>
									{i === currEditableWord && isEdit ? (
										<MaterialIcon
											classname="hover:fill-teal-900"
											name="MdOutlineDoneOutline"
										/>
									) : (
										<MaterialIcon
											classname="hover:fill-red-600"
											name="MdEditNote"
										/>
									)}
								</div>

								<div
									onClick={() => handleDeleteWord(i)}
									className="mt-2 md:mx-2 h-full w-12 cursor-pointer"
								>
									<MaterialIcon
										classname="hover:fill-red-600"
										name="MdDeleteOutline"
									/>
								</div>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
})

TextDictionary.displayName = 'TextDictionary'

export default TextDictionary
