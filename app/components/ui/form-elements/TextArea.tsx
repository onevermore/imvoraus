import { ITextArea } from './form.interface'
import cn from 'classnames'
import { forwardRef } from 'react'

import styles from './form.module.scss'

export const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
	({ placeholder, error, style, inputStyle, ...rest }, ref) => {
		return (
			<div className="mb-6 w-full">
				<label>
					<span>{placeholder}</span>
					<textarea
						placeholder={placeholder}
						className={cn(
							inputStyle,
							'w-full h-36 sm:h-64 px-2 py-4 border-2 rounded bg-#f8f8f8 text-base resize-none'
						)}
						ref={ref}
						{...rest}
					/>
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

TextArea.displayName = 'TextArea'
