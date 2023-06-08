import { ITableItem } from './AdmTable'
import { FC } from 'react'

import AdminActions from '@/components/ui/admin/AdminActions/AdminActions'

import s from './AdmTable.module.scss'

export interface IAdminTableItem {
	tableItem: ITableItem
	removeHandler: (id: string) => void
}

export const AdmTableItem: FC<IAdminTableItem> = ({
	tableItem,
	removeHandler,
}) => {
	return (
		<div className={s.item}>
			{tableItem.items.map((value) => (
				<div key={value}>{value}</div>
			))}

			<AdminActions
				editUrl={tableItem.editUrl}
				removeHandler={() => removeHandler(tableItem._id)}
			/>
		</div>
	)
}
