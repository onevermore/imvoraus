import { FC } from 'react'

import s from './SearchBar.module.scss'

export const SearchBar: FC = () => {
	return (
		<div className="pr-5">
			<input
				className="bg-searchColor border-0 h-8 tracking-widest w-40 xl:w-60 "
				type="search"
				placeholder="axtar..."
			/>
		</div>
	)
}
