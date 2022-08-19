import { useQuery } from '@tanstack/react-query'
import { GenreService } from 'services/genre.service'

import { IGenre } from '@/shared/types/movie.types'

import { getGenreUrl } from '@/config/url.config'

import { IMenuItem } from '../menu.interface'

export const usePopularGenres = () => {
	const queryData = useQuery(
		['popular-genres-menu'],
		() => GenreService.getAll(),
		{
			select: ({ data }) =>
				data
					.map(
						(genre: IGenre): IMenuItem => ({
							icon: genre.icon,
							link: getGenreUrl(genre.slug),
							title: genre.name,
						})
					)
					.splice(0, 4),
		}
	)

	return queryData
}
