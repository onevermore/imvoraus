import { Menu } from './Menu'
import { firstMenu } from './menu.data'
import { FC } from 'react'

export const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
		</div>
	)
}
