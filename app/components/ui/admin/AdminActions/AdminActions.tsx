import { useRouter } from 'next/router'
import { FC } from 'react'

import { MaterialIcon } from '../../MaterialIcon'

import styles from './AdminActions.module.scss'

interface IAdminActions {
	editUrl: string
	removeHandler: () => void
}

const AdminActions: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
	const { push } = useRouter()

	return (
		<div className="flex items-center gap-5">
			<button onClick={() => push(editUrl)}>
				<MaterialIcon classname="hover:w-[120%]" name="MdEdit" />
			</button>
			<button onClick={removeHandler}>
				<MaterialIcon name="MdClose" />
			</button>
		</div>
	)
}

export default AdminActions
