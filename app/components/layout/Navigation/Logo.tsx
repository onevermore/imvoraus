import { BurgerMenu } from './BurgerMenu/BurgerMenu'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '@/assets/images/logofeather.png'

export const Logo: FC = () => {
	return (
		<>
			<Link href="/">
				<div className="px-layout mb-10 block relative flex hidden xl:block">
					<span
						style={{ position: 'relative', left: '9px' }}
						className="font-['Proxima Nova'] font-normal text-2xl tracking-[.5em]"
					>
						imvoraus
					</span>
					<span
						className=""
						style={{
							position: 'absolute',
							bottom: '5px',
							right: '-7px',
						}}
					>
						<Image
							src={logoImage}
							width={50}
							height={54}
							alt="learn German"
							draggable={false}
						/>
					</span>
				</div>
			</Link>
		</>
	)
}
