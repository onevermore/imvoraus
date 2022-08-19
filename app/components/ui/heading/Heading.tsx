import { FC } from 'react'

interface IHeading {
	title: string
	className?: string
}

export const Heading: FC<IHeading> = ({ title, className }) => {
	return (
		<h1
			className={`text-black text-opacity-80 font-semibold first-letter: ${
				className?.includes('xl') ? '' : 'text-3xl'
			} ${className} `}
		>
			{title}
		</h1>
	)
}
