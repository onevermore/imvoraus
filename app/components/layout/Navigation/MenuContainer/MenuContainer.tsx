import { Menu } from './Menu'
import { GenreMenu } from './genres/GenreMenu'
import { firstMenu } from './menu.data'
import { FC } from 'react'

export const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
		</div>
	)
}
