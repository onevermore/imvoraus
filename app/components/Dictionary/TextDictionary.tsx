import cn from 'classnames'
import { FC, memo, useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { MaterialIcon } from '../ui/MaterialIcon'

import s from './Dictionary.module.scss'

interface ITranslate {
	userId: string
	_id: string
	word: string
	translation: string
}

interface ITextDictionary {
	list: ITranslate[]
	deleteIsLoading: boolean
	isSuccessDeleteWord: boolean
	removeHandler: ({
		wordId,
		userId,
	}: {
		wordId: string
		userId: string
	}) => void
}

const TextDictionary: FC<ITextDictionary> = memo(
	({ list, removeHandler, deleteIsLoading, isSuccessDeleteWord }) => {
		const [isEdit, setIsEdit] = useState(false)
		const [currEditableWord, setCurrEditableWord] = useState<null | number>(
			null
		)
		const [currDeleteRow, setCurrDeletedRow] = useState<string | null>(null)
		const { user } = useAuth()
		//console.count('TextDictionary rendered')

		const handleDeleteWord = (i: number) => {
			//	const newList = list.filter((v, index) => index !== i)
			//setList(newList)
		}

		/*	
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
			//setList(newListt)
		}
	}
*/

		useEffect(() => {
			if (isSuccessDeleteWord) setCurrDeletedRow(null)
		}, [list])

		if (!user) return <div>Loading...</div>

		return (
			<table className={s.table}>
				<thead className={s.thead}>
					<tr>
						<th>Word</th>
						<th>Translation</th>
						<th></th>
					</tr>
				</thead>
				<tbody id="dictionary-list">
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
									{/*	<div className="cursor-pointer h-full">
								
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
								</div>*/}

									{currDeleteRow === value._id ? (
										'Deleting...'
									) : (
										<div
											onClick={() => {
												setCurrDeletedRow(value._id)
												removeHandler({
													wordId: value._id,
													userId: value.userId,
												})
											}}
											className="mt-2 md:mx-2 h-full w-12 cursor-pointer"
										>
											<MaterialIcon
												classname="hover:fill-red-600"
												name="MdDeleteOutline"
											/>
										</div>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	}
)

TextDictionary.displayName = 'TextDictionary'

export default TextDictionary
