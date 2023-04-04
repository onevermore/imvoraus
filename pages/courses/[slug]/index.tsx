import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { axiosClassic } from 'api/interceptors'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CoursesService } from 'services/courses.service'

import { Button } from '@/components/ui/form-elements/Button'
//import { TextsList } from '@/components/ui/text-cards/TextsList/TextsList'
import { ITextListData } from '@/components/ui/text-cards/TextsList/textlist.interface'

import { ICourse } from '@/shared/types/create-course.types'

import { getCoursesUrl } from '@/config/api.config'

const DynamicTextsList = dynamic(
	() => import('@/components/ui/text-cards/TextsList/TextsList'),
	{
		ssr: false,
	}
)

const DynamicCrosswordsList = dynamic(
	() =>
		import('@/components/ui/crossword-elements/CrosswordList/CrosswordList'),
	{
		ssr: false,
	}
)

export const getStaticPaths: GetStaticPaths = async () => {
	const data = await CoursesService.getAllCourses()
	const paths = data.map((course: ICourse) => {
		return {
			params: { slug: course.slug },
		}
	})

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const courseSlug = String(params?.slug)
	//	const { data: texts } = await CoursesService.getCourseDataBySlug(courseSlug)
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(
		['courses', courseSlug],
		async () => {
			const r = await CoursesService.getCourseDataBySlug(courseSlug)
			//	console.log('prefetched = ', r)
			return r
		},
		{
			staleTime: Infinity,
		}
	)
	/*	const responseSimilarMovies = await MovieService.getByGenres(
		movie.genres.map((g) => g._id)
	)*/
	//	console.log(dehydrate(queryClient))
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			courseSlug,
		},
	}
}

const CourseInfo: NextPage = () => {
	//console.log(courseSlug)
	const router = useRouter()
	const courseSlug = String(router.query.slug)

	const { data } = useQuery(['courses', courseSlug], async () =>
		CoursesService.getCourseDataBySlug(courseSlug)
	)
	//	const courseId = router.query.slug
	//	console.log('component data ==== ', data.data.title)
	return (
		<div>
			<div>{data?.title} www</div>
			<Button colored onClick={() => router.back()}>
				Back
			</Button>
			<DynamicTextsList list={data?.texts} />
			<DynamicCrosswordsList crosswords={data?.crosswords} />
		</div>
	)
}

export default CourseInfo
