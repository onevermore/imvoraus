import { IHome } from './home.interface'
import { FC } from 'react'
import { toastr } from 'react-redux-toastr'



import { Button } from '@/components/ui/form-elements/Button'
import { DekorHeading } from '@/components/ui/heading-decor/DekorHeading'

import { Meta } from '@/utils/meta/Meta'
import {Options} from '@/components/options/Options'
import { Tooltip } from '../../tooltip/Tooltip'

export const Home: FC<IHome> = () => {
	return (
		<Meta
			title="Watch movies online"
			description="watch movies and TV shows online on Redflix"
		>
		<DekorHeading text="Alman Dili" className='text-center' />
		<Options />

		
		</Meta>
	)
}
