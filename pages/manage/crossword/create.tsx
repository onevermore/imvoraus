import { GetStaticProps, NextPage } from 'next'

import { CrosswordForm } from '@/components/screens/admin/crossword/CrosswordForm'
import { IOptions } from '@/components/screens/admin/select.types'
import { ICourseCard2 } from '@/components/ui/text-cards/CourseCard/course-card.interface'

import { CoursesService } from '@/services/courses.service'

export const getStaticProps: GetStaticProps = async () => {
	try {
		const allCourses = await CoursesService.getAllCourses()
		const coursesNames = allCourses.map(
			(v: Omit<ICourseCard2, 'imageURL'>) => ({
				value: v._id,
				label: v.title,
			})
		)
		return {
			props: { coursesNames },
		}
	} catch (e) {
		// console.log(e)

		return {
			props: {},
			// notFound: true,
		}
	}
}
const CreateCrossword: NextPage<{ coursesNames: IOptions[] }> = ({
	coursesNames,
}) => {
	return <CrosswordForm coursesNames={coursesNames} />
}

export default CreateCrossword
