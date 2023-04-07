import { GetStaticProps, NextPage } from 'next'

import { IOptions, TextForm } from '@/components/screens/admin/text/TextForm'
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

const CreateText: NextPage<{ coursesNames: IOptions[] }> = ({
	coursesNames,
}) => {
	return <TextForm coursesNames={coursesNames} />
}

export default CreateText
