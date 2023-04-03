import { FC } from 'react'

import { TextCard } from '../TextCard/TextCard'
import { ITextData } from '../TextCard/text.interface'

export const SwipeCards: FC<{ list: ITextData[] }> = ({ list }) => {
	return (
		<div className=" flex overflow-x-scroll p-2 w-72 snap-mandatory snap-x scroll-p-2 ">
			{list.map((text, i) => (
				<div
					key={i}
					className="shrink-0 grow-0 basis-full p-2 snap-start h-full"
				>
					<TextCard
						imageURL="img.jpg"
						title={text.title}
						slug={text.slug}
						description={text.description}
						text={text.text}
						complexity={text.complexity}
					/>
				</div>
			))}
		</div>
	)
}
