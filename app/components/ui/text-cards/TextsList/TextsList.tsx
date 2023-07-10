import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import textImage from '@/assets/images/zod.webp'

import { Button } from '../../form-elements/Button'
import { Heading } from '../../heading/Heading'
import { TextCard } from '../TextCard/TextCard'
import { ITextDataFull } from '../TextCard/text.interface'

import s from './TextsList.module.scss'

const TextsList: FC<{ list: ITextDataFull[]; full?: boolean }> = ({
	list,
	full,
}) => {
	/*w-full flex flex-col lg:flex-row flex-wrap gap-5 py-8 pr-[10] */

	//const isServer = typeof window === 'undefined'
	const [width, setWidth] = useState(window.innerWidth)
	const router = useRouter()
	const { push } = router
	const { slug: courseSlug } = router.query

	useEffect(() => {
		const handleResizeWindow = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResizeWindow)
		return () => window.removeEventListener('resize', handleResizeWindow)
	}, [])

	const textData = full ? list : list.slice(0, 3)
	//console.count('Text List rendered ' + full)
	return (
		<>
			<Heading title="Texts" className="py-8" />
			<div
			id='text-list'
				className={cn({
					[s['swipe-container']]: width < 450,
					[s['grid-container']]: width >= 450,
				})}
			>
				{textData.map((text, i) => (
					<div
						key={i}
						className={cn({
							[s['swipe-item']]: width < 450,
						})}
					>
						<TextCard
							imageURL={textImage.src}
							title={text.title}
							slug={text.slug}
							description={text.description}
							text={text.text}
							complexity={text.complexity}
						/>
					</div>
				))}
			</div>
			{!full && (
				<div className="flex justify-end">
					<Button
						colored
						onClick={(e) => {
							e.preventDefault()
							router.push(`/courses/${courseSlug}/texts`, undefined, {
								shallow: true,
							})
						}}
					>
						View all
					</Button>
				</div>
			)}
		</>
	)
}

export default TextsList
