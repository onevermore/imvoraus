import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { Button } from '../form-elements/Button'
import { ICourseCard } from '../text-cards/CourseCard/course-card.interface'

import s from './CourseCard.module.scss'

export const AdmCourseCard: FC<Omit<ICourseCard, 'ownerId'>> = ({
	_id,
	title,
	description,
	level,
	price,
	slug,
	imageURL,
}) => {
	const router = useRouter()

	return (
		<div className="bg-teal-700/[.5]  rounded-3xl  basis-4/12 h-92">
			<div className="m-8   overflow-x-hidden">
				<h2 className="mr-auto">{title}</h2>
				<Image
					alt="image"
					src={imageURL}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: '100%', height: '55%' }}
				/>
				<div className="py-5 h-50 overflow-y-hidden">
					{description.slice(0, 20)}...
				</div>
				<div className="flex-center-between">
					<div>{level}</div>
					<div>{price > 0 ? `${price}$` : 'free'}</div>
				</div>
				<div>
					<Button
						colored
						onClick={() => router.push(`/profile/courses/${slug}`)}
					>
						Open
					</Button>
				</div>
			</div>
		</div>
	)
}
