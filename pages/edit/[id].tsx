import { NextPage } from 'next'

import { UserAvatar } from '@/components/screens/admin/user/UserAvatar'

const UserEditPage: NextPage = () => {
	return <UserAvatar />
}

export default UserEditPage

/*   /courses/[slug]/index.tsx
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CoursesService } from 'services/courses.service'

import { Button } from '@/components/ui/form-elements/Button'

import { ICourse } from '@/shared/types/create-course.types'

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

	//	console.log(dehydrate(queryClient))
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			courseSlug,
		},
	}
}

const CourseInfo: NextPage = () => {

	const router = useRouter()
	const courseSlug = String(router.query.slug)

	const { data } = useQuery(['courses', courseSlug], async () =>
		CoursesService.getCourseDataBySlug(courseSlug)
	)

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

*/
