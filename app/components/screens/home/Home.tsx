import { IHome } from './home.interface'
import { axiosClassic } from 'api/interceptors'
import axios from 'axios'
import Image from 'next/image'
import router from 'next/router'
import { FC, useEffect, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { Options } from '@/components/options/Options'
import { Button } from '@/components/ui/form-elements/Button'
import { DekorHeading } from '@/components/ui/heading-decor/DekorHeading'

import { Meta } from '@/utils/meta/Meta'

export const Home: FC<IHome> = () => {
	/*	const [data, setData] = useState('')

	useEffect(() => {
		const f = async () => {
			const fet = await axiosClassic.get('/files/url/access', {
				params: {
					key: 'users/user2/20210708_111234.jpg',
				},
			})

			setData(fet.data.url)
			console.log('fetchRES ======== ', fet.data.url)
		}
		f()
	}, [])
*/

	return (
		<Meta
			title="learn German online"
			description="Learn german by watching movies online on Imvoraus"
		>
			<DekorHeading text="Learn German" className="text-center" />
			<Options />
			<div className="my-24 ">
				<Button colored onClick={() => router.push(`/course`)}>
					Dictionary
				</Button>
			</div>

			{/*data && (
				<Image
					src={data}
					alt="Picture of the author"
					width={500}
					height={500}
				/>
			)*/}
		</Meta>
	)
}
