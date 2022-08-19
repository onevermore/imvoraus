
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
		<DekorHeading text="Lüğət" className='text-center' />

			<Tooltip 
			text="As has been the case for many years, jobs, or forms of employment wherein employees perform a service or duty in exchange for financial compensation, play a prominent role in society. Furthermore, all jobs—even those of seemingly little significance—are important, as they simply wouldn't exist if their specific responsibilities weren't of value to employers (companies or persons that pay others for their work), customers (individuals who pay money for a product or service), and the economy generally. Teachers, or educational professionals tasked with helping students understand certain subjects and topics, are especially crucial today. In short, teachers help their students to become qualified for their future careers. Doctors, or medical professionals who specialize in providing health-related assistance to patients, are some of the most respected individuals in America and the world. It's the responsibility of doctors to help those who feel less-than-stellar to determine the underlying health issue(s) and recommend an effective treatment (or remedy to a disease, disorder, or condition)." />
		</Meta>
	)
}