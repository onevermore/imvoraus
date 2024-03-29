import { useTranslation } from './useTranslation'
import { FC } from 'react'

import { SkeletonLoader } from '../ui/skeleton-loader/SkeletonLoader'

export const Translation: FC<{ word: string }> = ({ word }) => {
	const { isLoading, data, error } = useTranslation()

	return isLoading ? (
		<div className="mx-11 mb-6">
			<SkeletonLoader count={1} className="h-7 mt-6" />
		</div>
	) : (
		<>{data ? <div>{data.translatedText}</div> : null}</>
	)
}
