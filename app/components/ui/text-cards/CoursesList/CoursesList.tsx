import router from 'next/router'
import { FC } from 'react'

import { ICourseCard } from '@/components/ui/text-cards/CourseCard/course-card.interface'

import courseImage from '@/assets/images/cour.jpg'

import { Button } from '../../form-elements/Button'
import { CourseCard } from '../CourseCard/CourseCard'

import s from './CoursesList.module.scss'

const CoursesList: FC<{ courses: ICourseCard[]; full?: boolean }> = ({
	courses,
	full,
}) => {
	const coursesData = full ? courses : courses.slice(0, 3)
	return (
		<>
			<div className="w-[80%] mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-5 pt-16">
				{coursesData?.map((course: ICourseCard) => (
					<CourseCard
						key={course._id}
						_id={course._id}
						title={course.title}
						description={course.description}
						level={course.level}
						price={course.price}
						slug={course.slug}
						isPublic={course.isPublic}
						imageURL={courseImage.src}
					/>
				))}
			</div>
			{!full && (
				<div className="flex justify-end">
					<Button
						colored
						onClick={(e) => {
							e.preventDefault()
							router.push(`/`)
						}}
					>
						View all
					</Button>
				</div>
			)}
		</>
	)
}

export default CoursesList
