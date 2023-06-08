import { axiosClassic } from 'api/interceptors'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { TextWithDictionary } from '@/components/TextWithDictionary/TextWithDictionary'
import { Heading } from '@/components/ui/heading/Heading'

import { ITextPart } from '@/shared/types/text.types'

export interface IText {
	_id: string
	title: string
	slug: string
	description: string
	text: string
	complexity: number
	course: string
	createdAt: string
	updatedAt: string
	__v: number
}

/*
export const getStaticPaths: GetStaticPaths = async () => {
	const data = await CoursesService.getAllCourses()
	const data2 = await CoursesService.getAllTexts()
	const paths1 = data.map((course: ICourseCard2) => {
		return {
			params: { slug: course.slug },
		}
	})

	return {
		paths: ,
		fallback: false,
	}
}
*/

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const textSlug = context.params?.textId

	let { data } = await axiosClassic.get(`/texts/by-slug/${textSlug}`)
	let { _id, title, slug, description, text, complexity, course } = data
	const mytext: Partial<IText> = {
		_id,
		title,
		//slug,
		//	description,
		text,
		course,
		//complexity,
	}

	return {
		props: {
			textData: mytext,
		},
	}
}

const Text: NextPage<{ textData: ITextPart }> = ({ textData }) => {
	return (
		<TextWithDictionary
			_id={textData._id}
			title={textData.title}
			text={textData.text}
			course={textData.course}
		/>
	)
}

export default Text
