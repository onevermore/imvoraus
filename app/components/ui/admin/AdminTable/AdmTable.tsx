import { AdmTableHeader } from './AdmTableHeader'
import { AdmTableItem } from './AdmTableItem'
import { FC } from 'react'

import { SkeletonLoader } from '@/components/ui/skeleton-loader/SkeletonLoader'

import styles from './AdmTable.module.scss'

export interface ITableItem {
	_id: string
	editUrl: string
	items: (string | number)[]
}

interface IAdminTable {
	tableItems: ITableItem[]
	headerItems: string[]
	isLoading: boolean
	removeHandler: (id: string) => void
}

export const AdmTable: FC<IAdminTable> = ({
	tableItems,
	headerItems,
	isLoading,
	removeHandler,
}) => {
	//console.log('my tableItems === ', tableItems)
	return (
		<div>
			<AdmTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdmTableItem
						key={tableItem._id}
						tableItem={tableItem}
						removeHandler={removeHandler}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</div>
	)
}
