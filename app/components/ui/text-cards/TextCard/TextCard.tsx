import { ITextData } from './text.interface'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { FC } from 'react'

import { Button } from '../../form-elements/Button'

export const TextCard: FC<ITextData> = ({
	imageURL,
	title,
	slug,
	description,
	text,
	complexity,
}) => {
	const router = useRouter()

	const { slug: courseSlug } = router.query

	/*p-[50px] grow-0 shrink-0 basis-[calc(100%/3)]    basis-full*/
	return (
		<div className="bg-teal-700/[.5]  rounded-3xl     ">
			<div className="p-10 w-11/12 m-auto flex flex-col min-h-full  ">
				<div className="font-bold">{title}</div>
				<div className="flex-auto w-full">
					<Image
						alt="image"
						src={imageURL}
						width="100%"
						height="55%"
						layout="responsive"
					/>
					<div>{description}</div>
					{/*<div className="">{text.slice(0, 40)}...</div>*/}
					<div>{complexity}</div>
				</div>
				<Button
					colored
					onClick={() => router.push(`/courses/${courseSlug}/text/${slug}`)}
				>
					Open
				</Button>
			</div>
		</div>
	)
}
