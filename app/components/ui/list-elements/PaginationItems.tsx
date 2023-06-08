import { FC } from 'react'

import { Button } from '@/components/ui/form-elements/Button'

type PaginationProps = {
	page: number
	totalPages: number
	onPrevClick: () => void
	onNextClick: () => void
}

export const PaginationItems: FC<PaginationProps> = ({
	page,
	totalPages,
	onPrevClick,
	onNextClick,
}) => {
	console.log('total pages === ', totalPages)
	return (
		<div className="flex items-center mt-10">
			{page > 1 && (
				<Button rose onClick={onPrevClick}>
					Prev
				</Button>
			)}
			<div>
				Page {page} of {totalPages}
			</div>
			{page < totalPages && (
				<Button rose onClick={onNextClick}>
					Next
				</Button>
			)}
		</div>
	)
}
