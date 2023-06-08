import cn from 'classnames'
import { FC } from 'react'

import styles from './AdmTable.module.scss'

export const AdmTableHeader: FC<{ headerItems: string[] }> = ({
	headerItems,
}) => {
	return (
		<div className={cn(styles.item, styles.itemHeader)}>
			{headerItems.map((value) => (
				<div key={value}>{value}</div>
			))}

			<div>Actions</div>
		</div>
	)
}
