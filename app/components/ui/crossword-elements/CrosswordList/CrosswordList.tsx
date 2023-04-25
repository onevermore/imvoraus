import cn from 'classnames'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ICrosswordFull } from '@/shared/types/crossword.types'

import crossImage from '@/assets/images/cross.jpg'

import { Heading } from '../../heading/Heading'
import { CrosswordCard } from '../CrosswordCard/CrosswordCard'

import s from './CrosswordList.module.scss'

const CrosswordList = ({
	crosswords,
	full,
}: {
	crosswords: ICrosswordFull[]
	full?: boolean
}) => {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResizeWindow = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResizeWindow)
		return () => window.removeEventListener('resize', handleResizeWindow)
	}, [])

	const crossList = full ? crosswords : crosswords.slice(0, 3)
	const router = useRouter()
	const { slug: courseSlug } = router.query
	const { push } = router
	//	console.count('Cross List rendered ' + full)
	return (
		<>
			<Heading title="Crosswords" className="py-8" />
			<div
				className={cn({
					[s['swipe-container']]: width < 450,
					[s['grid-container']]: width >= 450,
				})}
			>
				{crossList.map((crossword) => (
					<div
						key={crossword._id}
						className={cn({
							[s['swipe-item']]: width < 450,
						})}
					>
						<CrosswordCard
							crossword={{ ...crossword, imageURL: crossImage.src }}
						/>
					</div>
				))}
			</div>
		</>
	)
}
export default CrosswordList
