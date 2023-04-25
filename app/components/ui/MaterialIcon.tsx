import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { TypeMaterialIcon } from '@/shared/types/icon.types'

export const MaterialIcon: FC<{
	name: TypeMaterialIcon
	classname?: string
}> = ({ name, classname }) => {
	const IconComponent = MaterialIcons[name]

	return <IconComponent className={classname} /> || <MaterialIcons.MdError />
}
