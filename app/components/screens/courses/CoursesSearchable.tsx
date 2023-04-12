import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, FC, useState } from 'react'

import { CourseSkeleton } from '@/components/ui/skeleton-loader/CourseSkeleton'
import { SkeletonLoader } from '@/components/ui/skeleton-loader/SkeletonLoader'

import { SearchField } from '@/ui/search-field/SearchField'

import { useDebounce } from '@/hooks/useDebounce'

import { CoursesService } from '@/services/courses.service'

import CoursesList from '../../ui/text-cards/CoursesList/CoursesList'

//import s from './Search.module.scss'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const {
		isSuccess,
		data: myCourses,
		isLoading,
	} = useQuery(['search courses list', debouncedSearch], () =>
		CoursesService.getAllCourses(debouncedSearch)
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return (
		<div>
			<div className="w-[40%]">
				<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
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
