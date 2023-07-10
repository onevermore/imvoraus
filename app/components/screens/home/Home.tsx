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

import mainGif from '@/assets/images/gif1.gif'
import crossGif from '@/assets/images/gif2.gif'

import { Meta } from '@/utils/meta/Meta'

export const Home: FC<IHome> = () => {
	return (
		<Meta
			title="learn German online"
			description="Learn german by watching movies online on Imvoraus"
		>
			<DekorHeading text="Learn German with us!" className="text-center" />
			<h3>Sign up to create a course !</h3>
			<DekorHeading className="text-center" text="Choose your level:" />
			<Options />
			<DekorHeading
				className="text-center"
				text="Add new words to your dictionary!"
			/>
			<div>
				<div className="flex justify-center">
					<Image
						alt="image"
						src={mainGif.src}
						width={0}
						height={0}
						sizes="100vw"
						style={{
							padding: '30px',
							backgroundColor: 'rgb(14 189 183 / 0.3)',
						}}
						className="w-[90%] md:w-[70%] rounded-md"
					/>
				</div>
			</div>

			<div className="my-6">
				<div className="flex justify-center">
					<Image
						alt="image"
						src={crossGif.src}
						width={0}
						height={0}
						sizes="100vw"
						style={{
							padding: '30px',
							backgroundColor: 'rgb(14 189 183 / 0.3)',
						}}
						className="w-[90%] md:w-[70%] rounded-md"
					/>
				</div>
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
