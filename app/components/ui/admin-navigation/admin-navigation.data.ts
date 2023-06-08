import { getAdminUrl } from '@/config/url.config'

export interface INavItem {
	title: string
	link: string
}
export const navAdminItems2: INavItem[] = [
	{
		title: 'New Course',
		link: getAdminUrl('course/create'),
	},
	{
		title: 'New Text',
		link: getAdminUrl('text/create'),
	},
	{
		title: 'New Crossword',
		link: getAdminUrl('crossword/create'),
	},
]

export const navAdminItems: INavItem[] = [
	{
		title: 'Courses',
		link: getAdminUrl('courses'),
	},
	{
		title: 'Texts',
		link: getAdminUrl('texts'),
	},
	{
		title: 'Crosswords',
		link: getAdminUrl('crossword'),
	},
]
