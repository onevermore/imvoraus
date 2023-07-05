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

//import s from './Search.module.scss'

const CoursesSearchable: FC = () => {
	//	const [searchTerm, setSearchTerm] = useState('')
	const router = useRouter()
	//	const { name } = router.query
	/*	const [name, setName] = useSearchParamsState({
		name: 'name',
		deserialize: (v: string | null) => v || '',
	})*/
	/*	const [level, setLevel] = useSearchParamsState({
		name: 'level',
		deserialize: (v: string | null) => v || '',
	})*/

	const [level, setLevel] = useQueryParam('level', withDefault(StringParam, ''))
	const [name, setName] = useQueryParam('name', withDefault(StringParam, ''))
	const [page, setPage] = useState(1)
	const debouncedSearch = useDebounce(name, 500)
	//const [level, setLevel] = useState('')
	const searchInputRef = useRef<HTMLInputElement>(null)
	const {
		isSuccess,
		data: myCourses,
		isLoading,
	} = useQuery(['search courses list', debouncedSearch, level, page], () =>
		//CoursesService.getAllCourses(debouncedSearch as string, level)
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

	useEffect(() => {
		if (searchInputRef.current) {
			searchInputRef.current.focus() // Focus the search input element on component mount
		}
	}, [myCourses])

	console.log('myCourses === ', myCourses)

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

	/*
	const handleLevel = (selectedLevel: IOptions2 | null): void => {
		if (selectedLevel) setLevel(selectedLevel.value)
		//	filterCoursesSearch({ level: selectedLevel.value })
		//if ((selectedLevel.value = '' || !selectedLevel.value))
	}*/

	return (
		<div>
			<div className="w-[40%] flex-center-between flex-wrap">
				<div>
					<SearchField
						ref={searchInputRef}
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
