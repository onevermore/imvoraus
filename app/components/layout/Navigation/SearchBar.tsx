import { FC } from 'react'

import s from './SearchBar.module.scss'

export const SearchBar: FC = () => {
	return (
		<div>
			<input
				className="bg-searchColor border-0 h-8 tracking-widest"
				type="search"
				placeholder="axtar..."
			/>
		</div>
	)
}
