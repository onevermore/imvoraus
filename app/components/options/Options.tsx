import { useRouter } from 'next/router'
import { FC } from 'react'

import fon from '@/assets/images/ellipse1.png'

import { Button } from '../ui/form-elements/Button'
import { Heading } from '../ui/heading/Heading'

export const Options: FC = () => {
	const router = useRouter()
	return (
		<div className="flex flex-wrap items-center justify-evenly">
			<div
				className="flex justify-center items-center flex-col"
				style={{ backgroundImage: `url(${fon.src})`, width: 261, height: 254 }}
			>
				<Heading title="A1" />
				<Button colored onClick={() => router.push('/courses/course-1')}>
					Go
				</Button>
			</div>
			<div
				className="flex justify-center items-center flex-col"
				style={{
					backgroundImage: `url(${fon.src})`,
					width: 261,
					height: 254,
				}}
			>
				<Heading title="A2" />
				<Button colored onClick={() => router.push('/courses/course-2')}>
					Go
				</Button>
			</div>
			<div
				className="flex justify-center items-center flex-col"
				style={{ backgroundImage: `url(${fon.src})`, width: 261, height: 254 }}
			>
				<Heading title="B1" />
				<Button colored onClick={() => router.push('/courses/course-3')}>
					Go
				</Button>
			</div>

			{/*	<Image src={fon} width={261} height={254} alt="text" draggable={false} />
			<Image src={fon} width={261} height={254} alt="text" draggable={false} />
			<Image src={fon} width={261} height={254} alt="text" draggable={false} />  */}
		</div>
	)
}
