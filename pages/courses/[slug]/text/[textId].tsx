import { axiosClassic } from 'api/interceptors'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { Heading } from '@/components/ui/heading/Heading'

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
	let { _id, title, slug, description, text, complexity } = data
	const mytext: Partial<IText> = {
		_id,
		title,
		slug,
		description,
		text,
		complexity,
	}

	return {
		props: {
			text: mytext,
		},
	}
}

const Text: NextPage<{ text: Partial<IText> }> = ({ text }) => {
	return (
		<>
			<h1>{/*My Text number <b>{textId}</b> for Course: <b>{slug}</b>*/}</h1>
			{text.title && <Heading title={text.title} />}
			<div className="my-5">{text.text}</div>
		</>
	)
}

export default Text
