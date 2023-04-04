import { FC } from 'react'

import { ICourseCard } from '@/components/ui/text-cards/CourseCard/course-card.interface'

import courseImage from '@/assets/images/cour.jpg'

import { CourseCard } from '../CourseCard/CourseCard'

import s from './CoursesList.module.scss'

const CoursesList: FC<{ courses: ICourseCard[] }> = ({ courses }) => {
	return (
		<div className="w-[80%] mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-5 pt-24">
			{courses?.map((course: ICourseCard) => (
				<CourseCard
					key={course._id}
					_id={course._id}
					title={course.title}
					description={course.description}
					level={course.level}
					price={0}
					slug={course.slug}
					imageURL={courseImage.src}
				/>
			))}
		</div>
	)
}

export default CoursesList
