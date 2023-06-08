import { useTexts } from './useTexts'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { AdmTable } from '@/components/ui/admin/AdminTable/AdmTable'
import { Button } from '@/components/ui/form-elements/Button'
import { Heading } from '@/components/ui/heading/Heading'
import { PaginationItems } from '@/components/ui/list-elements/PaginationItems'

import { getAdminUrl } from '@/config/url.config'

export const TextsList: FC = () => {
	const {
		createText,
		setPage,
		data,
		isLoading,
		deleteText,
		searchTerm,
		handleSearch,
	} = useTexts()
	const { push } = useRouter()

	if (!data) {
		return <div>Loading...</div>
	}

	const { texts, page, total, totalPages } = data

	//console.log('useTexts data === ', data)
	return (
		<>
			<AdminNavigation />

			<div className="flex items-center gap-8">
				<Heading title="Texts" />
				<Button rose onClick={() => push(getAdminUrl('text/create'))}>
					Add new Text
				</Button>
			</div>
			<PaginationItems
				page={page}
				totalPages={totalPages}
				onPrevClick={() => setPage((page) => page - 1)}
				onNextClick={() => setPage((page) => page + 1)}
			/>
			<AdmTable
				tableItems={texts || []}
				headerItems={['Title', 'Description', 'Complexity']}
				isLoading={isLoading}
				removeHandler={deleteText}
			/>
		</>
	)
}
