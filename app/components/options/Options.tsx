import { Option } from './Option'
import { useRouter } from 'next/router'

export const Options = () => {
	const router = useRouter()
	return (
		<div className="flex flex-wrap items-center justify-evenly max-w-[100%]">
			<Option title="A1" path="/courses/course-1" />
			<Option title="A2" path="/courses/course-2" />
			<Option title="B1" path="/courses/course-3" />

			{/*	<Image src={fon} width={261} height={254} alt="text" draggable={false} />
			<Image src={fon} width={261} height={254} alt="text" draggable={false} />
			<Image src={fon} width={261} height={254} alt="text" draggable={false} />  */}
		</div>
	)
}
