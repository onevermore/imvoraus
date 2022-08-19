
import { FC } from 'react'
import { toastr } from 'react-redux-toastr'

import { DekorHeading } from '@/components/ui/heading-decor/DekorHeading'

import { Meta } from '@/utils/meta/Meta'

import { Tooltip } from '../../tooltip/Tooltip'

export const WordsList: FC = () => {
	return (
		<Meta
			title="Learn new words"
			description="Learn new words from your dictionary"
		>
		<DekorHeading text="Luğət" className='text-center' />

			<Tooltip text="Hello, girls! This, is my super text. Now it is bigger than ever. Do you know English?" />
		</Meta>
	)
}