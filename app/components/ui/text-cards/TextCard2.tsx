import { FC } from 'react'

import { Button } from '../form-elements/Button'
import { Heading } from '../heading/Heading'

export const TextCard: FC<{ title: string; text: string }> = ({
	title,
	text,
}) => {
	return (
		<div className="">
			<Heading title={title} />
			<div>{text}</div>
			<Button className="bg-color-#0aa7a2">More...</Button>
		</div>
	)
}
