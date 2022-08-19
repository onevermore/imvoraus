import { FC } from 'react'

import s from './TableOfWords.module.scss'

export const TableOfWords: FC<{
	list: string[]
	setList: (list: string[]) => void
}> = ({ list, setList }) => {
	const handleDeleteTodo = (i: number) => {
		const newList = list.filter((v, index) => index !== i)
		setList(newList)
	}
	return (
		<table className={s.table}>
			<thead>
				<tr>
					<th>Word</th>
					<th>Translation</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{list?.map((value, i) => (
					<tr className={s.tr} key={i}>
						<td className={s.td}>{value}</td>
						<td className={s.td}>перевод слова</td>
						<td className={s.td}>
							<button className={s.btn} onClick={() => handleDeleteTodo(i)}>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
