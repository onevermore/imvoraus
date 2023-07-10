import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import { PaginationItems } from '@/components/ui/list-elements/PaginationItems'
import { CourseSkeleton } from '@/components/ui/skeleton-loader/CourseSkeleton'

import SearchField from '@/ui/search-field/SearchField'

import { useDebounce } from '@/hooks/useDebounce'

import { CoursesService } from '@/services/courses.service'

import CoursesList from '../../ui/text-cards/CoursesList/CoursesList'
import { useCourses } from '../admin/courses/useCourses'
import { optionsLevel2 } from '../admin/select.data'
import { IOptions2 } from '../admin/select.types'

const CoursesSearchable: FC = () => {
	//const router = useRouter()

	const [level, setLevel] = useQueryParam('level', withDefault(StringParam, ''))
	const [name, setName] = useQueryParam('name', withDefault(StringParam, ''))
	const [page, setPage] = useState(1)
	const debouncedSearch = useDebounce(name, 500)

	const {
		isSuccess,
		data: myCourses,
		isLoading,
	} = useQuery(['search courses list', debouncedSearch, level, page], () =>
		CoursesService.getPaginatedCourses({
			searchTerm: debouncedSearch,
			level,
			page,
		})
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleLevel = (selectedLevel: IOptions2 | null): void => {
		if (selectedLevel) setLevel(selectedLevel.value)
	}

	/*
	const filterCoursesSearch = ({ name, level }) => {
		const { query } = router
		if (level) query.level = level
		if (name) query.name = name
		router.push({
			pathname: router.pathname,
			query: query,
		})
	}
*/

	return (
		<div>
			<div className="w-[80%] lg:w-[60%] xl:w-[50%]  flex-center-between flex-row flex-nowrap gap-4">
				<div className="md:min-w-[50%]">
					<SearchField
						searchTerm={(name as string) || ''}
						handleSearch={handleSearch}
					/>
				</div>
				<div className="my-6 w-36">
					<Select
						styles={{ option: (styles) => ({ minHeight: 40, ...styles }) }}
						options={optionsLevel2}
						onChange={handleLevel}
						defaultValue={{ label: level, value: '' }}
					/>
				</div>
			</div>
			{myCourses?.totalPages && (
				<PaginationItems
					page={page}
					totalPages={myCourses.totalPages}
					onPrevClick={() => setPage((page) => page - 1)}
					onNextClick={() => setPage((page) => page + 1)}
				/>
			)}
			{isLoading && (
				<div className="w-[80%] mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-5 pt-24">
					<CourseSkeleton count={3} />
				</div>
			)}
			{isSuccess && <CoursesList full courses={myCourses.courses || []} />}
		</div>
	)
}

export default CoursesSearchable
