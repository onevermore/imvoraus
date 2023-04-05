import cn from 'classnames'
import { FC, useEffect, useState } from 'react'

import textImage from '@/assets/images/zod.webp'

import { Button } from '../../form-elements/Button'
import { Heading } from '../../heading/Heading'
import { TextCard } from '../TextCard/TextCard'
import { ITextData, ITextDataFull } from '../TextCard/text.interface'

import s from './TextsList.module.scss'

const TextsList: FC<{ list: ITextDataFull[] }> = ({ list }) => {
	/*w-full flex flex-col lg:flex-row flex-wrap gap-5 py-8 pr-[10] */

	//const isServer = typeof window === 'undefined'
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResizeWindow = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResizeWindow)
		return () => window.removeEventListener('resize', handleResizeWindow)
	}, [])

	return (
		<>
			<Heading title="Texts" className="py-8" />
			<div
				className={cn({
					[s['swipe-container']]: width < 450,
					[s['grid-container']]: width >= 450,
				})}
			>
				{list.map((text, i) => (
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

			<div className="flex justify-end">
				<Button colored>See all</Button>
			</div>
		</>
	)
}

export default TextsList
