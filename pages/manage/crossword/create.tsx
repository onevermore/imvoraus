import { GetStaticProps, NextPage } from 'next'

import { CrosswordForm } from '@/components/screens/admin/crossword/CrosswordForm'
import {
	ILevelsOption,
	IOptions,
} from '@/components/screens/admin/select.types'
import { ICourseCard2 } from '@/components/ui/text-cards/CourseCard/course-card.interface'

import { NextPageAuth } from '@/shared/types/auth.types'

import { CoursesService } from '@/services/courses.service'

export const getStaticProps: GetStaticProps = async () => {
	try {
		const allCourses = await CoursesService.getAllCourses()
		const courseLevels = allCourses.map(
			(v: Omit<ICourseCard2, 'imageURL'>) => ({
				value: v._id,
				level: v.level,
			})
		)
		const coursesNames = allCourses.map(
			(v: Omit<ICourseCard2, 'imageURL'>) => ({
				value: v._id,
				label: v.title,
			})
		)
		return {
			props: { coursesNames, courseLevels },
		}
	} catch (e) {
		// console.log(e)

		return {
			props: {},
			// notFound: true,
		}
	}
}

interface ICreateCrossForm {
	coursesNames: IOptions[]
	courseLevels: ILevelsOption[]
}

const CreateCrossword: NextPageAuth<ICreateCrossForm> = ({
	coursesNames,
	courseLevels,
}) => {
	return (
		<CrosswordForm coursesNames={coursesNames} courseLevels={courseLevels} />
	)
}
CreateCrossword.isUser = true
export default CreateCrossword
