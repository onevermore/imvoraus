import { IField } from './form.interface'
import cn from 'classnames'
import { forwardRef } from 'react'

import styles from './form.module.scss'

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, inputStyle, ...rest }, ref) => {
		if (placeholder === 'Answer') {
			console.log('error === ', error)
			console.log('type of error === ', typeof error)
		}
		return (
			<div className={cn(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input
						className={cn({
							[styles.slug]: placeholder === 'Slug',
						})}
						ref={ref}
						type={type}
						{...rest}
						style={inputStyle}
					/>
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
