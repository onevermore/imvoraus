import { FC } from 'react'
import Image from 'next/image'

import fon from '@/assets/images/ellipse1.png'


export const Options:FC = () => {
  return (
    <div style={{backgroundImage: `url(${fon})`}} className='flex flex-wrap items-center justify-evenly'>

<Image
							src={fon}
							width={261}
							height={254}
							alt="text"
							draggable={false}
						/>
  <Image
							src={fon}
							width={261}
							height={254}
							alt="text"
							draggable={false}
						/>
  <Image
							src={fon}
							width={261}
							height={254}
							alt="text"
							draggable={false}
						/>

    </div>
  )
}