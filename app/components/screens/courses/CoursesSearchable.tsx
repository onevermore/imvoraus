import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, FC } from 'react'
import Select, { SingleValue } from 'react-select'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import { CourseSkeleton } from '@/components/ui/skeleton-loader/CourseSkeleton'

import { SearchField } from '@/ui/search-field/SearchField'

import { useDebounce } from '@/hooks/useDebounce'

import { CoursesService } from '@/services/courses.service'

import CoursesList from '../../ui/text-cards/CoursesList/CoursesList'
import { optionsLevel2 } from '../admin/select.data'
import { ILevelsOption, IOptions2 } from '../admin/select.types'

//import s from './Search.module.scss'

const Search: FC = () => {
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
	const debouncedSearch = useDebounce(name, 500)
	//const [level, setLevel] = useState('')

	const {
		isSuccess,
		data: myCourses,
		isLoading,
	} = useQuery(['search courses list', debouncedSearch, level], () =>
		CoursesService.getAllCourses(debouncedSearch as string, level)
	)
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
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		setName(value)
		//setSearchTerm(e.target.value)
		//	const searchName = e.target.value
		//	filterCoursesSearch({ name: searchName })
	}

	const handleLevel = (selectedLevel: IOptions2 | null): void => {
		if (selectedLevel) setLevel(selectedLevel.value)
		//	filterCoursesSearch({ level: selectedLevel.value })
		//if ((selectedLevel.value = '' || !selectedLevel.value))
	}

	return (
		<div>
			<div className="w-[40%] flex-center-between flex-wrap">
				<div>
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
			{isLoading && (
				<div className="w-[80%] mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-5 pt-24">
					<CourseSkeleton count={3} />
				</div>
			)}
			{isSuccess && <CoursesList courses={myCourses || []} />}
		</div>
	)
}

export default Search
