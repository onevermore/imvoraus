import { ChangeEvent, FC, forwardRef } from 'react'

import { MaterialIcon } from '../MaterialIcon'

import s from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchField = forwardRef<HTMLInputElement, ISearchField>(
	({ searchTerm, handleSearch }, ref) => {
		return (
			<div className={s.search}>
				<MaterialIcon name="MdSearch" />
				<input
					ref={ref}
					placeholder="Search"
					value={searchTerm}
					onChange={handleSearch}
				/>
			</div>
		)
	}
)
SearchField.displayName = 'SearchField'
export default SearchField
