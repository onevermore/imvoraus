import { axiosClassic } from 'api/interceptors'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { Heading } from '@/components/ui/heading/Heading'

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
		paths: [
			...paths1,
			{ params: { textId: 'text-1-c-1' } },
			{ params: { textId: 'text-2-c-1' } },
			{ params: { textId: 'text-3-c-1' } },
		],
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

	return {
		props: {
			text: data,
		},
	}
}

const Text = ({ text }) => {
	const router = useRouter()

	//const { slug, textId } = router.query
	//const courseSlug = String(router.query.slug)
	//console.log('my text now is: ', text)

	return (
		<>
			<h1>{/*My Text number <b>{textId}</b> for Course: <b>{slug}</b>*/}</h1>
			<Heading title={text?.title} />
			<div className="my-5">{text.text}</div>
		</>
	)
}

export default Text
