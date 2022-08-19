import { IMenu } from './menu.interface'

export const firstMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			icon: 'MdHome',
			link: '/',
			title: 'Home',
		},
		{
			icon: 'MdExplore',
			link: '/pricing',
			title: 'Pricing',
		},
		{
			icon: 'MdRefresh',
			link: '/courses',
			title: 'Our Course',
		},
		{
			icon: 'MdLocalFireDepartment',
			link: '/info',
			title: 'Information',
		},
	],
}
/*
const userMenu: IMenu = {
	title: 'General',
	items: [],
}

export const menus: IMenu[] = [firstMenu, userMenu]
*/
