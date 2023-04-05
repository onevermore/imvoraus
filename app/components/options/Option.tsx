import { useRouter } from 'next/router'

import fon from '@/assets/images/ellipse1.png'

import { Button } from '../ui/form-elements/Button'
import { Heading } from '../ui/heading/Heading'

export interface IOption {
	title: string
	path: string
}

export const Option = ({ title, path }: IOption) => {
	const router = useRouter()
	return (
		<div
			className="flex justify-center items-center flex-col"
			style={{ backgroundImage: `url(${fon.src})`, width: 261, height: 254 }}
		>
			<Heading title={title} />
			<Button colored onClick={() => router.push(path)}>
				Go
			</Button>
		</div>
	)
}
