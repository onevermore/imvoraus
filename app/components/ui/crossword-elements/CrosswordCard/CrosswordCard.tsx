import Image from 'next/image'
import router, { useRouter } from 'next/router'
import StarRatingComponent from 'react-star-rating-component'

import { ICrosswordFull } from '@/shared/types/crossword.types'

import { Button } from '../../form-elements/Button'

export const CrosswordCard = ({
	crossword,
}: {
	crossword: ICrosswordFull & { imageURL: string }
}) => {
	const router = useRouter()

	const { slug: courseSlug } = router.query
	const { title, imageURL, description, complexity, slug } = crossword
	/*p-[50px] grow-0 shrink-0 basis-[calc(100%/3)]    basis-full*/
	return (
		<div className="bg-light-400/[.5]  rounded-3xl h-full ">
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
						layout="responsive"
					/>
					<div>{description}</div>
					{/*<div className="">{text.slice(0, 40)}...</div>*/}
				</div>
				<StarRatingComponent
					name="rate2"
					editing={false}
					starCount={5}
					value={complexity}
					starColor="#5ab1bc"
					emptyStarColor="#4f4f4f"
				/>
				<Button
					colored
					onClick={() =>
						router.push(`/courses/${courseSlug}/crosswords/${slug}`)
					}
				>
					Open
				</Button>
			</div>
		</div>
	)
}
