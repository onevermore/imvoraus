import { ITextData } from './text.interface'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { FC } from 'react'
import StarRatingComponent from 'react-star-rating-component'

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
		<div className="bg-teal-700/[.5]  rounded-3xl h-full ">
			<div className="p-10 w-11/12 m-auto flex flex-col min-h-full  ">
				<div className="font-bold">{title}</div>
				<div className="flex-auto w-full">
					<Image
						alt="image"
						src={imageURL}
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: '100%', height: '55%' }}
					/>
					<div>{description}</div>
					{/*<div className="">{text.slice(0, 40)}...</div>*/}
				</div>

				<StarRatingComponent
					name="rate2"
					editing={false}
					starCount={5}
					value={complexity}
					starColor="#c88ba0"
					emptyStarColor="#4f4f4f"
				/>
				<Button
					colored
					onClick={() => router.push(`/courses/${courseSlug}/texts/${slug}`)}
				>
					Open
				</Button>
			</div>
		</div>
	)
}
