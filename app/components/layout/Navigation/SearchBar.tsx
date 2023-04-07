import { FC } from 'react'

import { MaterialIcon } from '@/components/ui/MaterialIcon'

import s from './SearchBar.module.scss'

export const SearchBar: FC = () => {
	return (
		<div className="pr-5 justify-center w-64 sm:w-88 xl:w-96 hidden sm:flex">
			<input
				className="bg-searchColor rounded-sm border-0 h-10 tracking-widest max-w-[80%] "
				type="search"
				placeholder="search..."
			/>
			<div className="mt-2 mx-2 h-10 w-12">
				<MaterialIcon name="MdSearch" />
			</div>
		</div>
	)
}
